

https://github.com/user-attachments/assets/971c81e7-e463-43b5-b1c9-4d1e81d5a4a3


# javka

A simple, yet very customisable, toast library for React & Next.js - with a dithered block countdown that drains as time runs out. Zero dependencies. Theamable down to each individual pixel with CSS variables. No Tailwind. No ShadCN. No Motion. Just simple JavaScript and CSS.

## Install

```bash
npm i javka
```

## Quickstart

Mount `<Toaster />` once in your root layout and import the stylesheet:

```tsx
// app/layout.tsx
import { Toaster } from "javka";
import "javka/styles.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
```

Fire toasts from anywhere — components, handlers, plain functions:

```tsx
import { toast } from "javka";

toast("Snapshot saved", { description: "workspace · just now" });
toast.success("Deployed to production");
toast.error("Deploy failed", { description: "exit code 1", duration: 8000 });
toast.warning("Disk space low");
toast.info("Maya joined the call");
toast.dismiss();        // clear all
toast.dismiss(id);      // clear one (every call returns its id)
```

## `toast(title, options?)`

| option        | type              | default | |
| ------------- | ----------------- | ------- | --- |
| `duration`    | `number` (ms)     | `5000`  | time until auto-dismiss |
| `description` | `string`          | —       | smaller line under the title |
| `dismissible` | `boolean`         | `true`  | show the ✕ button |
| `onDismiss`   | `(id) => void`    | —       | fires when the toast is dismissed |

## `<Toaster />`

| prop         | type                                   | default          |
| ------------ | -------------------------------------- | ---------------- |
| `position`   | `"top"/"bottom"` × `"left/center/right"` | `"bottom-right"` |
| `maxToasts`  | `number`                               | `4`              |
| `label`      | `string` (a11y region label)           | `"Notifications"`|
| `gap`        | `number` px between expanded toasts    | `10`             |
| `peek`       | `number` px collapsed toasts peek out  | `12`             |
| `scaleStep`  | `number` shrink per collapsed toast    | `0.05`           |
| `blockCols`  | `number` countdown grid columns        | `32`             |
| `blockRows`  | `number` countdown grid rows           | `2`              |
| `shadeRange` | `[min, max]` block brightness range    | `[0.55, 1.3]`    |

Hovering the stack fans it out and pauses all timers. Mount exactly one
`<Toaster />`.

## Theming

Every visual decision routes through a CSS variable. Override on
`.javka-viewport` (or any wrapper):

```css
.javka-viewport {
  --javka-bg: rgb(248 247 244);
  --javka-fg: rgb(28 27 24);
  --javka-accent: rgb(120 118 110);
  --javka-radius: 8px;
  --javka-font: "Inter", sans-serif;
}
.javka-toast[data-kind="error"] { --javka-accent: rgb(220 38 38); }
```

Full token list: `--javka-bg` `--javka-fg` `--javka-accent` `--javka-border`
`--javka-highlight` `--javka-shadow` `--javka-font` `--javka-width`
`--javka-offset` `--javka-radius` `--javka-padding` `--javka-row-gap`
`--javka-title-size` `--javka-desc-size` `--javka-block-h` `--javka-block-gap`
`--javka-block-radius` `--javka-block-fade` `--javka-spent-opacity`
`--javka-exit-duration`. Variables prefixed `--_javka-` are internal.

Works with Tailwind, doesn't require it. Using `next/font`? Point the token
at its variable: `--javka-font: var(--font-inter), sans-serif;`

## License

MIT
