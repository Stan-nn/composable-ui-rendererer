# Composable UI Renderer

A JSON-driven composable UI renderer built with React, Vite, and TypeScript. The backend describes interface fragments as structured data; this frontend interprets and renders that structure.

---

## Getting started

```bash
npm install

# Run Storybook (primary exploration surface)
npm run storybook

# Run the dev server
npm run dev

# Type-check
npm run typecheck

# Lint
npm run lint

# Format
npm run format
```

---

## Architecture overview

```
src/
├── renderer/           # Dynamic dispatch engine
│   ├── types.ts        # Discriminated union: all node types
│   ├── registry.ts     # type string → React component map
│   ├── NodeRenderer.tsx  # Recursive renderer
│   ├── ErrorBoundary.tsx # Per-node render error fence
│   └── sanitizeStyle.ts  # CSS sanitizer for untrusted JSON
└── components/         # Dumb, pure UI primitives
    ├── Button/
    ├── Image/
    ├── Text/
    └── Div/
```

The key architectural separation: **`components/`** knows nothing about JSON — they are ordinary React components. **`renderer/`** owns all JSON-parsing and dispatch logic. They meet only at `registry.ts`.

---

## How the renderer works

`NodeRenderer` is a recursive function component that accepts `unknown` input (safe for raw `JSON.parse()` output):

1. **Validate shape** — checks the input is a non-null object with a `type` string. Returns a styled error UI on failure.
2. **Registry lookup** — looks up `registry[node.type]`. Returns a styled error UI for unknown types.
3. **ErrorBoundary** — wraps each render to catch exceptions from known-but-broken components.
4. **Render** — delegates to the matched component, passing the node's fields as props. Passes `NodeRenderer` itself as a prop to container nodes (like `Div`) to enable recursive rendering without a circular import.

**Two-level error handling keeps individual broken nodes isolated** — a malformed node shows an inline error badge without taking down the rest of the page.

---

## Adding a new element type

Three steps, no changes to `NodeRenderer.tsx`:

1. **Define the type** in `src/renderer/types.ts`:
   ```ts
   export interface VideoNode {
     type: 'video'
     video: { src: string; poster?: string; autoPlay?: boolean }
   }
   // Add VideoNode to the AnyNode union:
   export type AnyNode = ButtonNode | ImageNode | DivNode | TextNode | VideoNode
   ```

2. **Create the component** at `src/components/Video/Video.tsx`:
   ```tsx
   import type { VideoNode } from '../../renderer/types'
   export function Video({ video }: VideoNode) {
     return <video src={video.src} poster={video.poster} controls />
   }
   ```

3. **Register it** in `src/renderer/registry.ts`:
   ```ts
   import { Video } from '../components/Video/Video'
   export const registry = { ..., video: Video }
   ```

TypeScript's discriminated union will surface any switch-case exhaustiveness gaps across the codebase automatically.

---

## Tradeoffs and simplifications

### Style injection
Inline styles from JSON are passed through with a small block-list (`position`, `zIndex`, `pointerEvents`) rather than a full allow-list. A full allow-list would be more secure but requires ongoing maintenance as CSS evolves. CSS injection cannot execute JavaScript — the worst outcome is visual disruption. If this renderer processes genuinely untrusted third-party JSON in production, revisit this with a dedicated CSS sanitizer.

### HTML format and XSS
`format: "html"` uses `dangerouslySetInnerHTML`. This is intentional — the caller is responsible for sanitising HTML upstream (e.g. with [DOMPurify](https://github.com/cure53/DOMPurify)) before inserting it into the JSON tree. The `format: "markdown"` path goes through `react-markdown` which renders to React elements and never injects raw HTML.

### Registry uses `ComponentType<any>`
The runtime dispatch table (`registry.ts`) types its values as `ComponentType<any>`. This is intentional — the type safety lives in the discriminated union in `types.ts`, not in the registry map itself. Attempting to parameterise the registry with the union would require complex mapped types that add complexity without practical benefit at runtime.

### `NodeRenderer` injected as a prop to `Div`
`Div` renders children via `NodeRenderer`, but `NodeRenderer` imports `registry`, which imports `Div` — a circular dependency. Injecting `NodeRenderer` as a prop into `Div` breaks the cycle cleanly. React Context would also work but adds indirection; this approach is explicit and easy to test.

### Key index for child arrays
Children inside `Div` use the array index as `key`. This is acceptable for a renderer where JSON nodes have no stable identity. If the backend later provides stable IDs, those should be used instead.
