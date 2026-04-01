import type { Meta, StoryObj } from '@storybook/react-vite'
import { NodeRenderer } from '../../renderer/NodeRenderer'
import type { AnyNode } from '../../renderer/types'

/**
 * Div is a layout container — it makes most sense shown through the
 * NodeRenderer to demonstrate recursive child rendering.
 */
const meta: Meta<typeof NodeRenderer> = {
  title: 'Primitives/Div',
  component: NodeRenderer,
  parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj<typeof NodeRenderer>

const flexRowNode: AnyNode = {
  type: 'div',
  style: { display: 'flex', flexDirection: 'row', gap: '1rem', alignItems: 'center' },
  children: [
    { type: 'button', button: { label: 'Primary', variant: 'primary', url: '#' } },
    { type: 'button', button: { label: 'Secondary', variant: 'secondary', url: '#' } },
  ],
}

const gridNode: AnyNode = {
  type: 'div',
  style: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' },
  children: [
    {
      type: 'div',
      style: { padding: '1.5rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem' },
      children: [
        {
          type: 'text',
          text: '<h3>Card One</h3><p>Nested content inside a grid cell.</p>',
          format: 'html',
        },
      ],
    },
    {
      type: 'div',
      style: { padding: '1.5rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem' },
      children: [
        {
          type: 'text',
          text: '<h3>Card Two</h3><p>Another grid cell with text.</p>',
          format: 'html',
        },
      ],
    },
  ],
}

export const FlexRow: Story = {
  name: 'Flex row with children',
  args: { node: flexRowNode },
}

export const Grid: Story = {
  name: 'CSS Grid with nested cards',
  args: { node: gridNode },
}

export const Empty: Story = {
  name: 'Empty div',
  args: {
    node: {
      type: 'div',
      style: { height: '80px', border: '2px dashed #d1d5db', borderRadius: '0.5rem' },
    },
  },
}
