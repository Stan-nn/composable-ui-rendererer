import type { ButtonNode } from '../../renderer/types'
import styles from './Button.module.css'

const variantClass: Record<ButtonNode['button']['variant'], string> = {
  primary: styles.primary,
  secondary: styles.secondary,
}

export function Button({ button }: ButtonNode) {
  const { label, title, variant, url, target } = button

  return (
    <a
      href={url}
      title={title}
      target={target || undefined}
      rel={target === '_blank' ? 'noopener noreferrer' : undefined}
      className={`${styles.base} ${variantClass[variant] ?? ''}`}
    >
      {label}
    </a>
  )
}
