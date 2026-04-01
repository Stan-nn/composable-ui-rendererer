import type { ImageNode } from '../../renderer/types'
import styles from './Image.module.css'

export function Image({ image }: ImageNode) {
  const { url, alt, caption } = image

  return (
    <figure className={styles.figure}>
      <img src={url} alt={alt} className={styles.img} />
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
    </figure>
  )
}
