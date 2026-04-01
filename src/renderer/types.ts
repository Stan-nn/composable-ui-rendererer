import type { CSSProperties } from 'react'

export interface ButtonNode {
  type: 'button'
  button: {
    label: string
    title?: string
    variant: 'primary' | 'secondary'
    url: string
    target?: string
  }
}

export interface ImageNode {
  type: 'image'
  image: {
    url: string
    alt: string
    caption?: string
  }
}

export interface DivNode {
  type: 'div'
  style: CSSProperties
  children?: AnyNode[]
}

export type TextFormat = 'html' | 'plainText' | 'markdown'

export interface TextNode {
  type: 'text'
  text: string
  format: TextFormat
  style?: CSSProperties
}

/**
 * Discriminated union of all known node types.
 * To add a new primitive: add a new interface above and include it here.
 * NodeRenderer.tsx never needs to change.
 */
export type AnyNode = ButtonNode | ImageNode | DivNode | TextNode
