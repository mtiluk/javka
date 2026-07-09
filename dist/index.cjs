"use client";
"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  Toaster: () => Toaster,
  toast: () => toast
});
module.exports = __toCommonJS(index_exports);

// src/store.ts
var maxToasts = 4;
function setMaxToasts(n) {
  maxToasts = Math.max(1, Math.floor(n));
  enforceCap();
}
var toasts = [];
var listeners = [];
var count = 0;
function subscribe(listener) {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}
function getSnapshot() {
  return toasts;
}
var EMPTY = [];
function getServerSnapshot() {
  return EMPTY;
}
function emit() {
  for (const listener of listeners) {
    listener();
  }
}
function markDismissed(t) {
  t.onDismiss?.(t.id);
  return { ...t, dismissing: true };
}
function enforceCap() {
  const live = toasts.filter((t) => !t.dismissing);
  if (live.length <= maxToasts) return;
  const overflow = new Set(live.slice(maxToasts).map((t) => t.id));
  toasts = toasts.map((t) => overflow.has(t.id) ? markDismissed(t) : t);
}
function createToast(kind, title, options) {
  const id = `javka-${++count}`;
  const {
    duration = 5e3,
    description,
    dismissible = true,
    onDismiss
  } = options ?? {};
  toasts = [
    { id, kind, title, description, duration, dismissible, onDismiss, dismissing: false },
    ...toasts
  ];
  enforceCap();
  emit();
  return id;
}
function dismissToast(id) {
  let changed = false;
  toasts = toasts.map((t) => {
    if ((id === void 0 || t.id === id) && !t.dismissing) {
      changed = true;
      return markDismissed(t);
    }
    return t;
  });
  if (changed) emit();
}
function removeToast(id) {
  const before = toasts.length;
  toasts = toasts.filter((t) => t.id !== id);
  if (toasts.length !== before) emit();
}
var toast = Object.assign(
  (title, options) => createToast("default", title, options),
  {
    success: (title, options) => createToast("success", title, options),
    error: (title, options) => createToast("error", title, options),
    warning: (title, options) => createToast("warning", title, options),
    info: (title, options) => createToast("info", title, options),
    dismiss: dismissToast
  }
);

// src/toaster.tsx
var import_react = require("react");

// src/icons.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var Success = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
  "path",
  {
    stroke: "var(--javka-accent)",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "1.625",
    d: "m3.5 12.25 4.44 4.44a1.5 1.5 0 0 0 2.12 0L20.5 6.25"
  }
) });
var Warning = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", "aria-hidden": "true", children: [
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "path",
    {
      stroke: "var(--javka-accent)",
      strokeLinecap: "round",
      strokeWidth: "1.625",
      d: "M12 9v3.5M12 15.5v.5"
    }
  ),
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "path",
    {
      stroke: "var(--javka-accent)",
      strokeLinejoin: "round",
      strokeWidth: "1.5",
      d: "M3.854 20h16.322a1.5 1.5 0 0 0 1.305-2.24L13.415 3.527a1.5 1.5 0 0 0-2.603-.013L2.557 17.747A1.5 1.5 0 0 0 3.853 20Z"
    }
  )
] });
var ErrorIcon = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", "aria-hidden": "true", children: [
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "path",
    {
      stroke: "var(--javka-accent)",
      strokeLinejoin: "round",
      strokeWidth: "1.5",
      d: "M3.854 20h16.322a1.5 1.5 0 0 0 1.305-2.24L13.415 3.527a1.5 1.5 0 0 0-2.603-.013L2.557 17.747A1.5 1.5 0 0 0 3.853 20Z"
    }
  ),
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "path",
    {
      stroke: "var(--javka-accent)",
      strokeLinecap: "round",
      strokeWidth: "1.625",
      d: "M12 9v3.5M12 15.5v.5"
    }
  )
] });
var Info = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", "aria-hidden": "true", children: [
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "12", cy: "12", r: "8.5", stroke: "var(--javka-accent)", strokeWidth: "1.5" }),
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "path",
    {
      stroke: "var(--javka-accent)",
      strokeLinecap: "round",
      strokeWidth: "1.625",
      d: "M12 11v5M12 8v.5"
    }
  )
] });
var DefaultIcon = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", "aria-hidden": "true", children: [
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "path",
    {
      stroke: "var(--javka-accent)",
      strokeWidth: "1.5",
      d: "m12.713 2.635 7.535 4.067a.48.48 0 0 1 0 .846l-7.536 4.067a1.5 1.5 0 0 1-1.425 0L3.752 7.548a.48.48 0 0 1 0-.846l7.535-4.067a1.5 1.5 0 0 1 1.425 0Z"
    }
  ),
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "path",
    {
      stroke: "var(--javka-accent)",
      strokeWidth: "1.5",
      d: "M20.5 7.25v9.012a1.5 1.5 0 0 1-.787 1.32l-7 3.782a1.5 1.5 0 0 1-1.426 0l-7-3.783a1.5 1.5 0 0 1-.787-1.32V7.25M12 21.5V12"
    }
  )
] });
var KIND_ICONS = {
  default: DefaultIcon,
  success: Success,
  error: ErrorIcon,
  warning: Warning,
  info: Info
};

// src/toaster.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
function rollShades(count2, [min, max]) {
  return Array.from({ length: count2 }, () => min + Math.random() * (max - min));
}
function ToastItem({
  t,
  index,
  expanded,
  offset,
  dir,
  peek,
  scaleStep,
  blockCols,
  blockCount,
  shadeRange,
  reportHeight
}) {
  const Icon = KIND_ICONS[t.kind];
  const shades = (0, import_react.useMemo)(
    () => rollShades(blockCount, shadeRange),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t.id, blockCount]
  );
  const remaining = (0, import_react.useRef)(t.duration);
  const startedAt = (0, import_react.useRef)(0);
  (0, import_react.useEffect)(() => {
    if (expanded || t.dismissing) return;
    startedAt.current = Date.now();
    const timer = setTimeout(() => toast.dismiss(t.id), remaining.current);
    return () => {
      clearTimeout(timer);
      remaining.current -= Date.now() - startedAt.current;
    };
  }, [expanded, t.dismissing, t.id]);
  const measure = (0, import_react.useCallback)(
    (node) => {
      if (node) reportHeight(t.id, node.offsetHeight);
    },
    [t.id, reportHeight]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    "li",
    {
      ref: measure,
      className: "javka-toast",
      "data-kind": t.kind,
      "data-front": index === 0,
      "data-state": t.dismissing ? "closing" : "open",
      style: {
        "--_javka-duration": `${t.duration}ms`,
        zIndex: 100 - index,
        transform: expanded ? `translateY(${dir * offset}px)` : `translateY(${dir * index * peek}px) scale(${1 - index * scaleStep})`
      },
      onAnimationEnd: (e) => {
        if (e.animationName === "javka-out") removeToast(t.id);
      },
      children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "javka-inner", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "javka-row", children: [
          Icon && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "javka-icon", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Icon, {}) }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "javka-content", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "javka-title", children: t.title }),
            t.description && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "javka-description", children: t.description })
          ] }),
          t.dismissible && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            "button",
            {
              className: "javka-close",
              "aria-label": "Dismiss notification",
              onClick: () => toast.dismiss(t.id),
              children: "\u2715"
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "javka-progress", "aria-hidden": "true", children: shades.map((shade, i) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          "span",
          {
            className: "javka-block",
            style: {
              "--_javka-block-shade": shade,
              "--_javka-block-col": i % blockCols
            }
          },
          i
        )) })
      ] })
    }
  );
}
function Toaster({
  position = "bottom-right",
  maxToasts: maxToasts2 = 4,
  label = "Notifications",
  gap = 10,
  peek = 12,
  scaleStep = 0.05,
  blockCols = 32,
  blockRows = 2,
  shadeRange = [0.55, 1.3]
}) {
  const toasts2 = (0, import_react.useSyncExternalStore)(subscribe, getSnapshot, getServerSnapshot);
  const [hovered, setHovered] = (0, import_react.useState)(false);
  const viewportRef = (0, import_react.useRef)(null);
  (0, import_react.useEffect)(() => {
    setMaxToasts(maxToasts2);
  }, [maxToasts2]);
  const dir = position.startsWith("top") ? 1 : -1;
  (0, import_react.useEffect)(() => {
    if (!hovered) return;
    const frame = requestAnimationFrame(() => {
      const el = viewportRef.current;
      if (toasts2.length === 0 || el && !el.matches(":hover")) {
        setHovered(false);
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [toasts2, hovered]);
  const heights = (0, import_react.useRef)(/* @__PURE__ */ new Map());
  const [, bump] = (0, import_react.useState)(0);
  const reportHeight = (0, import_react.useCallback)((id, h) => {
    if (heights.current.get(id) !== h) {
      heights.current.set(id, h);
      bump((n) => n + 1);
    }
  }, []);
  const items = [];
  let acc = 0;
  let slot = 0;
  for (const t of toasts2) {
    items.push({ t, offset: acc, slot });
    if (!t.dismissing) {
      acc += (heights.current.get(t.id) ?? 0) + gap;
      slot += 1;
    }
  }
  const stackHeight = Math.max(acc - gap, 0);
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    "ol",
    {
      ref: viewportRef,
      className: "javka-viewport",
      "aria-label": label,
      "data-expanded": hovered,
      "data-position": position,
      style: {
        "--_javka-stack-h": `${stackHeight}px`,
        "--javka-gap": `${gap}px`,
        "--javka-block-cols": blockCols
      },
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
      children: items.map(({ t, offset, slot: index }) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        ToastItem,
        {
          t,
          index,
          expanded: hovered,
          offset,
          dir,
          peek,
          scaleStep,
          blockCols,
          blockCount: blockCols * blockRows,
          shadeRange,
          reportHeight
        },
        t.id
      ))
    }
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Toaster,
  toast
});
//# sourceMappingURL=index.cjs.map