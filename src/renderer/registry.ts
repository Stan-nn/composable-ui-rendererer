import type { ComponentType } from 'react'
import { Button } from '../components/Button/Button'
import { Image } from '../components/Image/Image'
import { Div } from '../components/Div/Div'
import { Text } from '../components/Text/Text'

/**
 * The single source of truth for registered node types.
 *
 * ComponentType<any> is intentional: this is a runtime dispatch table.
 * Type safety lives in the discriminated union in types.ts, not here.
 *
 * To add a new primitive:
 *  1. Add its interface + union member to renderer/types.ts
 *  2. Create the component in components/<Name>/<Name>.tsx
 *  3. Add one line here. NodeRenderer.tsx is never touched.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const registry: Record<string, ComponentType<any>> = {
  button: Button,
  image: Image,
  div: Div,
  text: Text,
}
