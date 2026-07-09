export type ToastKind = "default" | "success" | "error" | "warning" | "info";

export interface ToastOptions {
  /** ms before auto-dismiss. Default 5000. */
  duration?: number;
  /** Smaller line under the title. */
  description?: string;
  /** Show the ✕ button. Default true. */
  dismissible?: boolean;
  /** Called when the toast is dismissed (timer, ✕, or programmatic). */
  onDismiss?: (id: string) => void;
}

export interface ToastData {
  id: string;
  kind: ToastKind;
  title: string;
  description?: string | undefined;
  duration: number;
  dismissible: boolean;
  onDismiss?: ((id: string) => void) | undefined;
  dismissing: boolean;
}

let maxToasts = 4;

export function setMaxToasts(n: number) {
  maxToasts = Math.max(1, Math.floor(n));
  enforceCap();
}

let toasts: ToastData[] = [];
let listeners: Array<() => void> = [];
let count = 0;

export function subscribe(listener: () => void) {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}

export function getSnapshot() {
  return toasts;
}

/* must return the same reference every call */
const EMPTY: ToastData[] = [];
export function getServerSnapshot() {
  return EMPTY;
}

function emit() {
  for (const listener of listeners) {
    listener();
  }
}

function markDismissed(t: ToastData): ToastData {
  t.onDismiss?.(t.id);
  return { ...t, dismissing: true };
}

function enforceCap() {
  const live = toasts.filter((t) => !t.dismissing);
  if (live.length <= maxToasts) return;
  const overflow = new Set(live.slice(maxToasts).map((t) => t.id));
  toasts = toasts.map((t) => (overflow.has(t.id) ? markDismissed(t) : t));
}

function createToast(kind: ToastKind, title: string, options?: ToastOptions): string {
  const id = `javka-${++count}`;
  const {
    duration = 5000,
    description,
    dismissible = true,
    onDismiss,
  } = options ?? {};
  toasts = [
    { id, kind, title, description, duration, dismissible, onDismiss, dismissing: false },
    ...toasts,
  ];
  enforceCap();
  emit();
  return id;
}

export function dismissToast(id?: string) {
  let changed = false;
  toasts = toasts.map((t) => {
    if ((id === undefined || t.id === id) && !t.dismissing) {
      changed = true;
      return markDismissed(t);
    }
    return t;
  });
  if (changed) emit();
}

export function removeToast(id: string) {
  const before = toasts.length;
  toasts = toasts.filter((t) => t.id !== id);
  if (toasts.length !== before) emit();
}

export const toast = Object.assign(
  (title: string, options?: ToastOptions) => createToast("default", title, options),
  {
    success: (title: string, options?: ToastOptions) => createToast("success", title, options),
    error:   (title: string, options?: ToastOptions) => createToast("error", title, options),
    warning: (title: string, options?: ToastOptions) => createToast("warning", title, options),
    info:    (title: string, options?: ToastOptions) => createToast("info", title, options),
    dismiss: dismissToast,
  }
);
