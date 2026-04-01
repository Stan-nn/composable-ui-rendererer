import type { Meta, StoryObj } from '@storybook/react-vite'
import { NodeRenderer } from '../renderer/NodeRenderer'
import type { AnyNode } from '../renderer/types'

const meta: Meta<typeof NodeRenderer> = {
  title: 'Renderer/Full Page',
  component: NodeRenderer,
  parameters: { layout: 'fullscreen' },
}
export default meta
type Story = StoryObj<typeof NodeRenderer>

const theRavenNode: AnyNode = {
  type: 'div',
  style: {
    maxWidth: '680px',
    margin: '0 auto',
    padding: '4rem 1.5rem',
    display: 'grid',
    gap: '4rem',
  },
  children: [
    { type: 'text', text: '<h1>The raven</h1>', format: 'html' },
    {
      type: 'image',
      image: {
        url: 'https://images.unsplash.com/photo-1492037766660-2a56f9eb3fcb?q=80&w=1746&auto=format&fit=crop',
        alt: 'Blue art neon sign turned on',
        caption: 'Photo by Unsplash',
      },
    },
    {
      type: 'text',
      text: '<p>Once upon a midnight dreary</p>',
      format: 'html',
    },
    {
      type: 'div',
      style: {
        display: 'flex',
        flexDirection: 'row',
        gap: '2rem',
        alignItems: 'center',
        justifyContent: 'center',
      },
      children: [
        {
          type: 'button',
          button: {
            label: 'Leave a review',
            title: 'Proceed to the click trap',
            variant: 'primary',
            url: 'https://youtu.be/dQw4w9WgXcQ',
            target: '_blank',
          },
        },
        {
          type: 'button',
          button: {
            label: 'See more',
            title: 'Proceed to the click trap',
            variant: 'secondary',
            url: 'https://youtu.be/dQw4w9WgXcQ',
            target: '',
          },
        },
      ],
    },
  ],
}

export const TheRaven: Story = {
  name: 'The Raven (spec example)',
  args: { node: theRavenNode },
}

// ─── Markdown article ────────────────────────────────────────────────────────

const markdownNode: AnyNode = {
  type: 'div',
  style: {
    maxWidth: '680px',
    margin: '0 auto',
    padding: '4rem 1.5rem',
    display: 'grid',
    gap: '2rem',
  },
  children: [
    {
      type: 'text',
      format: 'markdown',
      text: `## Markdown rendering

This content is rendered via **react-markdown** — safe, no raw HTML injection.

### Features demonstrated

- Headings, paragraphs, lists
- \`inline code\`
- *Italic* and **bold** text
- Blockquotes

> "The revolution will not be televised." — Gil Scott-Heron

---

Markdown is ideal when the content source is text authored by a human, such as a CMS or a documentation database.`,
    },
  ],
}

export const MarkdownArticle: Story = {
  name: 'Markdown article',
  args: { node: markdownNode },
}

// ─── Error fallback demo ──────────────────────────────────────────────────────

export const ErrorFallback: Story = {
  name: 'Error fallback (unknown type)',
  args: {
    node: {
      type: 'div',
      style: {
        maxWidth: '680px',
        margin: '0 auto',
        padding: '4rem 1.5rem',
        display: 'grid',
        gap: '1.5rem',
      },
      children: [
        {
          type: 'text',
          text: '<h2>Error handling demo</h2><p>The nodes below are intentionally broken.</p>',
          format: 'html',
        },
        { type: 'video', src: 'https://example.com/clip.mp4' } as unknown as AnyNode,
        { missingType: true } as unknown as AnyNode,
        { type: 'button', button: { label: 'This one works', variant: 'primary', url: '#' } },
      ],
    } as AnyNode,
  },
}

// ─── Creative example: editorial music card ──────────────────────────────────

const editorialNode: AnyNode = {
  type: 'div',
  style: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '4rem 2rem',
    display: 'grid',
    gap: '3rem',
  },
  children: [
    // Header
    {
      type: 'div',
      style: {
        display: 'grid',
        gap: '0.5rem',
        borderBottom: '1px solid #e5e7eb',
        paddingBottom: '1.5rem',
      },
      children: [
        {
          type: 'text',
          format: 'html',
          text: '<p style="font-size: 0.75rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #6b7280">Album review</p>',
        },
        {
          type: 'text',
          format: 'html',
          text: '<h1 style="font-size: 3rem; font-weight: 800; letter-spacing: -0.05em; line-height: 1">Small Talk<br><span style="color: #6b7280; font-weight: 400; font-size: 1.75rem">Gil Scott-Heron</span></h1>',
        },
      ],
    },
    // Image + pull quote side by side
    {
      type: 'div',
      style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'start' },
      children: [
        {
          type: 'image',
          image: {
            url: 'https://images.unsplash.com/photo-1492037766660-2a56f9eb3fcb?q=80&w=1200&auto=format&fit=crop',
            alt: 'Blue art neon sign turned on',
            caption: 'Photo by Unsplash',
          },
        },
        {
          type: 'div',
          style: {
            display: 'grid',
            gap: '1.5rem',
            alignContent: 'start',
            paddingTop: '0.5rem',
          },
          children: [
            {
              type: 'text',
              format: 'html',
              text: '<blockquote style="font-size: 1.5rem; font-style: italic; font-weight: 300; line-height: 1.4; color: #374151; border-left: 3px solid #111827; padding-left: 1.25rem; margin: 0">"The revolution will not be televised."</blockquote>',
            },
            {
              type: 'text',
              format: 'markdown',
              text: `A landmark spoken word and jazz-funk record from **1974**. Scott-Heron's incisive social commentary, delivered over sparse piano and percussion, remains as urgent as ever.\n\n**Genre:** Jazz, Blues, Soul\n\n**Label:** Arista Records`,
            },
          ],
        },
      ],
    },
    // CTA row
    {
      type: 'div',
      style: {
        display: 'flex',
        gap: '1rem',
        alignItems: 'center',
        borderTop: '1px solid #e5e7eb',
        paddingTop: '1.5rem',
      },
      children: [
        {
          type: 'button',
          button: { label: 'Listen on Spotify', variant: 'primary', url: '#', target: '_blank' },
        },
        {
          type: 'button',
          button: { label: 'Read full review', variant: 'secondary', url: '#' },
        },
      ],
    },
  ],
}

export const EditorialCard: Story = {
  name: 'Creative: Editorial music review',
  args: { node: editorialNode },
}
