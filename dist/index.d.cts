import * as react from 'react';

type ToastKind = "default" | "success" | "error" | "warning" | "info";
interface ToastOptions {
    /** ms before auto-dismiss. Default 5000. */
    duration?: number;
    /** Smaller line under the title. */
    description?: string;
    /** Show the ✕ button. Default true. */
    dismissible?: boolean;
    /** Called when the toast is dismissed (timer, ✕, or programmatic). */
    onDismiss?: (id: string) => void;
}
interface ToastData {
    id: string;
    kind: ToastKind;
    title: string;
    description?: string | undefined;
    duration: number;
    dismissible: boolean;
    onDismiss?: ((id: string) => void) | undefined;
    dismissing: boolean;
}
declare function dismissToast(id?: string): void;
declare const toast: ((title: string, options?: ToastOptions) => string) & {
    success: (title: string, options?: ToastOptions) => string;
    error: (title: string, options?: ToastOptions) => string;
    warning: (title: string, options?: ToastOptions) => string;
    info: (title: string, options?: ToastOptions) => string;
    dismiss: typeof dismissToast;
};

type ToastPosition = "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right";
interface ToasterProps {
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
declare function Toaster({ position, maxToasts, label, gap, peek, scaleStep, blockCols, blockRows, shadeRange, }: ToasterProps): react.JSX.Element;

export { type ToastData, type ToastKind, type ToastOptions, type ToastPosition, Toaster, type ToasterProps, toast };
