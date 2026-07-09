"use client";
import {
  useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore,
} from "react";
import {
  subscribe, getSnapshot, getServerSnapshot, toast, setMaxToasts, removeToast,
  type ToastData,
} from "./store";
import { KIND_ICONS } from "./icons";

export type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export interface ToasterProps {
  /** Where the stack anchors. Default: "bottom-right". */
  position?: ToastPosition;
  /** Max toasts alive at once; oldest is dropped. Default: 4. */
  maxToasts?: number;
  /** Accessible label for the notification region. Default: "Notifications". */
  label?: string;
  /** px between toasts when expanded. Default: 10. */
  gap?: number;
  /** px each collapsed toast peeks out behind the front one. Default: 12. */
  peek?: number;
  /** How much each successive collapsed toast shrinks. Default: 0.05. */
  scaleStep?: number;
  /** Progress bar grid columns. Default: 32. */
  blockCols?: number;
  /** Progress bar grid rows. Default: 2. */
  blockRows?: number;
  /** [min, max] brightness range for the random block mottle. Default: [0.55, 1.3]. */
  shadeRange?: [number, number];
}

function rollShades(count: number, [min, max]: [number, number]): number[] {
  return Array.from({ length: count }, () => min + Math.random() * (max - min));
}

function ToastItem({
  t, index, expanded, offset, dir, peek, scaleStep, blockCols, blockCount, shadeRange, reportHeight,
}: {
  t: ToastData;
  index: number;
  expanded: boolean;
  offset: number;
  dir: 1 | -1;
  peek: number;
  scaleStep: number;
  blockCols: number;
  blockCount: number;
  shadeRange: [number, number];
  reportHeight: (id: string, height: number) => void;
}) {
  const Icon = KIND_ICONS[t.kind];

  const shades = useMemo(
    () => rollShades(blockCount, shadeRange),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t.id, blockCount]
  );

  const remaining = useRef(t.duration);
  const startedAt = useRef(0);

  useEffect(() => {
    if (expanded || t.dismissing) return;
    startedAt.current = Date.now();
    const timer = setTimeout(() => toast.dismiss(t.id), remaining.current);
    return () => {
      clearTimeout(timer);
      remaining.current -= Date.now() - startedAt.current;
    };
  }, [expanded, t.dismissing, t.id]);

  const measure = useCallback(
    (node: HTMLLIElement | null) => {
      if (node) reportHeight(t.id, node.offsetHeight);
    },
    [t.id, reportHeight]
  );

  return (
    <li
      ref={measure}
      className="javka-toast"
      data-kind={t.kind}
      data-front={index === 0}
      data-state={t.dismissing ? "closing" : "open"}
      style={
        {
          "--_javka-duration": `${t.duration}ms`,
          zIndex: 100 - index,
          transform: expanded
            ? `translateY(${dir * offset}px)`
            : `translateY(${dir * index * peek}px) scale(${1 - index * scaleStep})`,
        } as React.CSSProperties
      }
      onAnimationEnd={(e) => {
        if (e.animationName === "javka-out") removeToast(t.id);
      }}
    >
      <div className="javka-inner">
        <div className="javka-row">
          {Icon && (
            <span className="javka-icon" aria-hidden="true">
              <Icon />
            </span>
          )}
          <div className="javka-content">
            <div className="javka-title">{t.title}</div>
            {t.description && <div className="javka-description">{t.description}</div>}
          </div>
          {t.dismissible && (
            <button
              className="javka-close"
              aria-label="Dismiss notification"
              onClick={() => toast.dismiss(t.id)}
            >
              ✕
            </button>
          )}
        </div>
        <div className="javka-progress" aria-hidden="true">
          {shades.map((shade, i) => (
            <span
              key={i}
              className="javka-block"
              style={
                {
                  "--_javka-block-shade": shade,
                  "--_javka-block-col": i % blockCols,
                } as React.CSSProperties
              }
            />
          ))}
        </div>
      </div>
    </li>
  );
}

export function Toaster({
  position = "bottom-right",
  maxToasts = 4,
  label = "Notifications",
  gap = 10,
  peek = 12,
  scaleStep = 0.05,
  blockCols = 32,
  blockRows = 2,
  shadeRange = [0.55, 1.3],
}: ToasterProps) {
  const toasts = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [hovered, setHovered] = useState(false);
  const viewportRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    setMaxToasts(maxToasts);
  }, [maxToasts]);

  const dir: 1 | -1 = position.startsWith("top") ? 1 : -1;

  useEffect(() => {
    if (!hovered) return;
    const frame = requestAnimationFrame(() => {
      const el = viewportRef.current;
      if (toasts.length === 0 || (el && !el.matches(":hover"))) {
        setHovered(false);
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [toasts, hovered]);

  const heights = useRef(new Map<string, number>());
  const [, bump] = useState(0);
  const reportHeight = useCallback((id: string, h: number) => {
    if (heights.current.get(id) !== h) {
      heights.current.set(id, h);
      bump((n) => n + 1);
    }
  }, []);

  const items: { t: ToastData; offset: number; slot: number }[] = [];
  let acc = 0;
  let slot = 0;
  for (const t of toasts) {
    items.push({ t, offset: acc, slot });
    if (!t.dismissing) {
      acc += (heights.current.get(t.id) ?? 0) + gap;
      slot += 1;
    }
  }
  const stackHeight = Math.max(acc - gap, 0);

  return (
    <ol
      ref={viewportRef}
      className="javka-viewport"
      aria-label={label}
      data-expanded={hovered}
      data-position={position}
      style={
        {
          "--_javka-stack-h": `${stackHeight}px`,
          "--javka-gap": `${gap}px`,
          "--javka-block-cols": blockCols,
        } as React.CSSProperties
      }
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {items.map(({ t, offset, slot: index }) => (
        <ToastItem
          key={t.id}
          t={t}
          index={index}
          expanded={hovered}
          offset={offset}
          dir={dir}
          peek={peek}
          scaleStep={scaleStep}
          blockCols={blockCols}
          blockCount={blockCols * blockRows}
          shadeRange={shadeRange}
          reportHeight={reportHeight}
        />
      ))}
    </ol>
  );
}
