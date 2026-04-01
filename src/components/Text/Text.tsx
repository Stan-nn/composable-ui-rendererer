import ReactMarkdown from 'react-markdown'
import type { TextNode } from '../../renderer/types'
import styles from './Text.module.css'

export function Text({ text, format, style }: TextNode) {
  if (format === 'html') {
    /**
     * dangerouslySetInnerHTML is used intentionally for the 'html' format.
     * Callers are responsible for sanitizing content upstream (e.g. DOMPurify)
     * if it originates from user-generated input.
     */
    return <div className={styles.root} style={style} dangerouslySetInnerHTML={{ __html: text }} />
  }

  if (format === 'markdown') {
    // react-markdown renders to React elements — safe, no raw HTML injection.
    return (
      <div className={styles.root} style={style}>
        <ReactMarkdown>{text}</ReactMarkdown>
      </div>
    )
  }

  // plainText: preserve line breaks
  return (
    <p className={styles.root} style={{ whiteSpace: 'pre-wrap', ...style }}>
      {text}
    </p>
  )
}
