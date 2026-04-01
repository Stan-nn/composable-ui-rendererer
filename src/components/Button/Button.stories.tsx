import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'Primitives/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    button: { control: 'object' },
  },
}
export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    type: 'button',
    button: {
      label: 'Continue',
      title: 'Proceed to the next step',
      variant: 'primary',
      url: 'https://youtu.be/dQw4w9WgXcQ',
      target: '_blank',
    },
  },
}

export const Secondary: Story = {
  args: {
    type: 'button',
    button: {
      label: 'See more',
      title: 'View additional content',
      variant: 'secondary',
      url: 'https://youtu.be/dQw4w9WgXcQ',
      target: '_blank',
    },
  },
}

export const NoTarget: Story = {
  name: 'Same-window link',
  args: {
    type: 'button',
    button: {
      label: 'Go back',
      variant: 'secondary',
      url: '#',
    },
  },
}

export const SideBySide: Story = {
  name: 'Primary + Secondary together',
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Button
        type="button"
        button={{ label: 'Leave a review', variant: 'primary', url: '#', target: '_blank' }}
      />
      <Button
        type="button"
        button={{ label: 'See more', variant: 'secondary', url: '#', target: '_blank' }}
      />
    </div>
  ),
}
