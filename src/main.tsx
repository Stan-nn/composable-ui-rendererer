import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { NodeRenderer } from './renderer/NodeRenderer'
import type { AnyNode } from './renderer/types'

const demo: AnyNode = {
  type: 'div',
  style: {
    maxWidth: '720px',
    margin: '0 auto',
    padding: '4rem 1.5rem',
    display: 'grid',
    gap: '4rem',
  },
  children: [
    // ── Header ──────────────────────────────────────────────────────────────
    {
      type: 'text',
      format: 'html',
      text: '<h1>Composable UI Renderer</h1><p>Every component rendered from a single JSON node tree.</p>',
    },

    // ── Text: all three formats ──────────────────────────────────────────────
    {
      type: 'div',
      style: { display: 'grid', gap: '2rem' },
      children: [
        { type: 'text', format: 'html', text: '<h2>Text component</h2>' },

        {
          type: 'div',
          style: { display: 'grid', gap: '1.5rem' },
          children: [
            {
              type: 'text',
              format: 'html',
              text: '<p><strong>format: html</strong></p><p>Raw HTML injected via <code>dangerouslySetInnerHTML</code>. Supports any HTML the browser understands.</p>',
            },
            {
              type: 'text',
              format: 'markdown',
              text: '**format: markdown** — rendered via `react-markdown`\n\n```ts\n// Adding a new node type takes three steps:\n// 1. Define the interface in renderer/types.ts\nexport interface VideoNode {\n  type: \'video\'\n  video: { src: string; poster?: string }\n}\n\n// 2. Create the component\nexport function Video({ video }: VideoNode) {\n  return <video src={video.src} controls />\n}\n\n// 3. Register it — NodeRenderer never changes\nexport const registry = { ..., video: Video }\n```\n\n> "The revolution will not be televised." — Gil Scott-Heron',
            },
            {
              type: 'text',
              format: 'plainText',
              text: 'format: plainText\nLine breaks are\npreserved as-is.',
            },
          ],
        },
      ],
    },

    // ── Image ────────────────────────────────────────────────────────────────
    {
      type: 'div',
      style: { display: 'grid', gap: '2rem' },
      children: [
        { type: 'text', format: 'html', text: '<h2>Image component</h2>' },
        {
          type: 'image',
          image: {
            url: 'https://images.unsplash.com/photo-1699950866841-e0de4adb9123?q=80&w=1200&auto=format&fit=crop',
            alt: 'A raven perched at autumn',
            caption: 'Credits to Paddy Pohlog | Unsplash',
          },
        },
      ],
    },

    // ── Button ───────────────────────────────────────────────────────────────
    {
      type: 'div',
      style: { display: 'grid', gap: '2rem' },
      children: [
        { type: 'text', format: 'html', text: '<h2>Button component</h2>' },
        {
          type: 'div',
          style: { display: 'flex', gap: '1rem', alignItems: 'center' },
          children: [
            {
              type: 'button',
              button: {
                label: 'Primary',
                variant: 'primary',
                url: 'https://youtu.be/dQw4w9WgXcQ',
                target: '_blank',
              },
            },
            {
              type: 'button',
              button: {
                label: 'Secondary',
                variant: 'secondary',
                url: 'https://youtu.be/dQw4w9WgXcQ',
                target: '_blank',
              },
            },
          ],
        },
      ],
    },

    // ── Div: nested layout ───────────────────────────────────────────────────
    {
      type: 'div',
      style: { display: 'grid', gap: '2rem' },
      children: [
        {
          type: 'text',
          format: 'html',
          text: '<h2>Div component</h2><p>A layout container with required <code>style</code> and recursive <code>children</code>.</p>',
        },
        {
          type: 'div',
          style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' },
          children: [
            {
              type: 'div',
              style: { padding: '1.5rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem' },
              children: [
                {
                  type: 'text',
                  format: 'html',
                  text: '<h3>Cell A</h3><p>Nested inside a CSS grid.</p>',
                },
              ],
            },
            {
              type: 'div',
              style: { padding: '1.5rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem' },
              children: [
                {
                  type: 'text',
                  format: 'html',
                  text: '<h3>Cell B</h3><p>Each cell is its own node.</p>',
                },
              ],
            },
          ],
        },
      ],
    },

    // ── Error fallback ───────────────────────────────────────────────────────
    {
      type: 'div',
      style: { display: 'grid', gap: '2rem' },
      children: [
        {
          type: 'text',
          format: 'html',
          text: '<h2>Error handling</h2><p>Unknown or malformed nodes fail gracefully — the rest of the page keeps rendering.</p>',
        },
        { type: 'video', src: 'not-a-real-type.mp4' } as unknown as AnyNode,
        { missingType: true } as unknown as AnyNode,
        {
          type: 'button',
          button: { label: 'Go Back To Top of Page', variant: 'primary', url: '#' },
        },
      ],
    },
  ],
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NodeRenderer node={demo} />
  </StrictMode>
)
