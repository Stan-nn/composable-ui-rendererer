import { Component, type ReactNode } from 'react'
import styles from './ErrorBoundary.module.css'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

/**
 * Wraps each rendered node. Catches React render exceptions so that a
 * broken component never takes down the rest of the page.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.boundary} role="alert">
          <span className={styles.icon}>⚠</span>
          <span>
            <strong>Render error:</strong> {this.state.error?.message}
          </span>
        </div>
      )
    }
    return this.props.children
  }
}
