"use client";
import { useSyncExternalStore } from "react";
import {
  subscribe, getSnapshot, getServerSnapshot, toast, type ToastData,
} from "./store";

function ToastItem({ t }: { t: ToastData }) {
  return (
    <li className="javka-toast" data-kind={t.kind}>
      <div className="javka-inner">
        <span className="javka-icon" aria-hidden="true" />
        <div className="javka-content">
          <div className="javka-title">{t.title}</div>
          {t.description && <div className="javka-description">{t.description}</div>}
          <div className="javka-progress" />
        </div>
        <button
          className="javka-close"
          aria-label="Dismiss notification"
          onClick={() => toast.dismiss(t.id)}
        >
          ✕
        </button>
      </div>
    </li>
  );
}

export function Toaster() {
  const toasts = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return (
    <ol className="javka-viewport" aria-label="Notifications">
      {toasts.map((t) => (
        <ToastItem key={t.id} t={t} />
      ))}
    </ol>
  );
}
