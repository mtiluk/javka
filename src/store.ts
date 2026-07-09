export type ToastKind = "default" | "success" | "error" | "warning" | "info";

export interface ToastOptions {
  duration?: number;      // unused for now — kept so the API doesn't change later
  description?: string;
}

export interface ToastData {
  id: string;
  kind: ToastKind;
  title: string;
  description?: string | undefined;
  duration: number;
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

const EMPTY: ToastData[] = [];
export function getServerSnapshot() {
  return EMPTY;
}

function emit() {
  for (const listener of listeners) {
    listener();
  }
}

function createToast(kind: ToastKind, title: string, options?: ToastOptions): string {
  const id = `javka-${++count}`;
  const { duration = 5000, description } = options ?? {};
  toasts = [{ id, kind, title, description, duration }, ...toasts];
  emit();
  return id;
}

export function removeToast(id?: string) {
  toasts = id === undefined ? [] : toasts.filter((t) => t.id !== id);
  emit();
}

export const toast = Object.assign(
  (title: string, options?: ToastOptions) => createToast("default", title, options),
  {
    success: (title: string, options?: ToastOptions) => createToast("success", title, options),
    error:   (title: string, options?: ToastOptions) => createToast("error", title, options),
    warning: (title: string, options?: ToastOptions) => createToast("warning", title, options),
    info:    (title: string, options?: ToastOptions) => createToast("info", title, options),
    dismiss: removeToast,
  }
);
