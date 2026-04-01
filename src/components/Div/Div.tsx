import type { ComponentType } from 'react'
import type { AnyNode, DivNode } from '../../renderer/types'
import { sanitizeStyle } from '../../renderer/sanitizeStyle'

interface Props extends DivNode {
  /**
   * NodeRenderer is injected as a prop rather than imported directly.
   * This avoids a circular dependency: NodeRenderer → registry → Div → NodeRenderer.
   */
  NodeRenderer: ComponentType<{ node: unknown }>
}

export function Div({ style, children, NodeRenderer }: Props) {
  return (
    <div style={sanitizeStyle(style)}>
      {children?.map((child: AnyNode, i: number) => (
        <NodeRenderer key={i} node={child} />
      ))}
    </div>
  )
}
