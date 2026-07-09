import type { ReactElement } from "react";
import type { ToastKind } from "./store";

const Success = (): ReactElement => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
    <path
      stroke="var(--javka-accent)"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.625"
      d="m3.5 12.25 4.44 4.44a1.5 1.5 0 0 0 2.12 0L20.5 6.25"
    />
  </svg>
);

const Warning = (): ReactElement => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
    <path
      stroke="var(--javka-accent)"
      strokeLinecap="round"
      strokeWidth="1.625"
      d="M12 9v3.5M12 15.5v.5"
    />
    <path
      stroke="var(--javka-accent)"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M3.854 20h16.322a1.5 1.5 0 0 0 1.305-2.24L13.415 3.527a1.5 1.5 0 0 0-2.603-.013L2.557 17.747A1.5 1.5 0 0 0 3.853 20Z"
    />
  </svg>
);

const ErrorIcon = (): ReactElement => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
    <path
      stroke="var(--javka-accent)"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M3.854 20h16.322a1.5 1.5 0 0 0 1.305-2.24L13.415 3.527a1.5 1.5 0 0 0-2.603-.013L2.557 17.747A1.5 1.5 0 0 0 3.853 20Z"
    />
    <path
      stroke="var(--javka-accent)"
      strokeLinecap="round"
      strokeWidth="1.625"
      d="M12 9v3.5M12 15.5v.5"
    />
  </svg>
);

const Info = (): ReactElement => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="8.5" stroke="var(--javka-accent)" strokeWidth="1.5" />
    <path
      stroke="var(--javka-accent)"
      strokeLinecap="round"
      strokeWidth="1.625"
      d="M12 11v5M12 8v.5"
    />
  </svg>
);

const DefaultIcon = (): ReactElement => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
    <path
      stroke="var(--javka-accent)"
      strokeWidth="1.5"
      d="m12.713 2.635 7.535 4.067a.48.48 0 0 1 0 .846l-7.536 4.067a1.5 1.5 0 0 1-1.425 0L3.752 7.548a.48.48 0 0 1 0-.846l7.535-4.067a1.5 1.5 0 0 1 1.425 0Z"
    />
    <path
      stroke="var(--javka-accent)"
      strokeWidth="1.5"
      d="M20.5 7.25v9.012a1.5 1.5 0 0 1-.787 1.32l-7 3.782a1.5 1.5 0 0 1-1.426 0l-7-3.783a1.5 1.5 0 0 1-.787-1.32V7.25M12 21.5V12"
    />
  </svg>
);

export const KIND_ICONS: Partial<Record<ToastKind, () => ReactElement>> = {
  default: DefaultIcon,
  success: Success,
  error: ErrorIcon,
  warning: Warning,
  info: Info,
};
