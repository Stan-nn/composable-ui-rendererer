import type { Meta, StoryObj } from '@storybook/react-vite'
import { Text } from './Text'

const meta: Meta<typeof Text> = {
  title: 'Primitives/Text',
  component: Text,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj<typeof Text>

export const Html: Story = {
  name: 'HTML format',
  args: {
    type: 'text',
    format: 'html',
    text: '<h2>Once upon a midnight dreary</h2><p>While I pondered, <strong>weak and weary</strong>, over many a quaint and curious volume of forgotten lore—</p>',
  },
}

export const Markdown: Story = {
  name: 'Markdown format',
  args: {
    type: 'text',
    format: 'markdown',
    text: `## The Raven

While I pondered, **weak and weary**, over many a quaint and curious volume of forgotten lore—

- Nameless here for evermore
- Quoth the Raven, *"Nevermore"*
- Darkness there and nothing more

> "And the only word there spoken was the whispered word, Lenore?"`,
  },
}

export const PlainText: Story = {
  name: 'Plain text format',
  args: {
    type: 'text',
    format: 'plainText',
    text: 'This is plain text.\nLine breaks are preserved automatically.',
  },
}

export const WithStyle: Story = {
  name: 'With inline style',
  args: {
    type: 'text',
    format: 'html',
    text: '<p>Styled via the optional style prop.</p>',
    style: { color: '#6366f1', fontSize: '1.125rem', fontStyle: 'italic' },
  },
}
