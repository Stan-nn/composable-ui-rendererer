import type { CSSProperties } from 'react'

/**
 * Sanitizes an unknown style object from JSON input.
 
  **Why block `position`, `zIndex`, and `pointerEvents`?**
  These three properties are the most commonly exploited in CSS injection attacks:
  - `position: fixed` combined with `z-index: 9999` can overlay a fake element over the entire page.
  - `pointer-events: none` can make real interactive elements unclickable, effectively hijacking the UI.
  By blocking these properties, we mitigate the most common attack vectors while still allowing a wide range of safe styles.    
 */
const BLOCKED_PROPERTIES = new Set(['position', 'zIndex', 'pointerEvents'])

export function sanitizeStyle(raw: unknown): CSSProperties {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return {}

  const cleaned: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(raw as Record<string, unknown>)) {
    if (BLOCKED_PROPERTIES.has(key)) continue
    if (typeof value !== 'string' && typeof value !== 'number') continue
    cleaned[key] = value
  }
  return cleaned as CSSProperties
}
