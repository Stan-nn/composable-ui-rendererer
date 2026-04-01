import type { AnyNode } from './types'
import { ErrorBoundary } from './ErrorBoundary'
import styles from './NodeRenderer.module.css'
import { registry } from './registry'

interface Props {
  node: unknown
}

/**
 * The recursive dispatch engine.
 *
 * Accepts `unknown` at the boundary so callers can pass raw JSON.parse()
 * output safely. Two levels of error handling:
 *
 *  1. Pre-render guard (synchronous): validates node shape and dispatches
 *     to the registry. Unknown/malformed nodes render an inline error UI.
 *
 *  2. ErrorBoundary (React): catches exceptions thrown during the render
 *     of a known-but-broken component instance.
 */
export function NodeRenderer({ node }: Props) {
  if (node === null || node === undefined || typeof node !== 'object' || Array.isArray(node)) {
    return <InvalidNode node={node} reason="Node must be a non-null object" />
  }

  const record = node as Record<string, unknown>

  if (!('type' in record) || typeof record['type'] !== 'string') {
    return <InvalidNode node={node} reason='Node is missing a "type" string field' />
  }

  const type = record['type']
  const Component = registry[type]

  if (!Component) {
    return <InvalidNode node={node} reason={`Unknown node type: "${type}"`} />
  }

  return (
    <ErrorBoundary>
      <Component {...(node as AnyNode)} NodeRenderer={NodeRenderer} />
    </ErrorBoundary>
  )
}

function InvalidNode({ node, reason }: { node: unknown; reason: string }) {
  return (
    <div className={styles.invalid} role="alert">
      <div className={styles.invalidHeader}>
        <span className={styles.invalidIcon}>✕</span>
        <strong>Invalid node:</strong> {reason}
      </div>
      {node !== undefined && (
        <pre className={styles.invalidDetail}>{JSON.stringify(node, null, 2)}</pre>
      )}
    </div>
  )
}
