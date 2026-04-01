import type { Meta, StoryObj } from '@storybook/react-vite'
import { Image } from './Image'

const meta: Meta<typeof Image> = {
  title: 'Primitives/Image',
  component: Image,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj<typeof Image>

export const WithCaption: Story = {
  args: {
    type: 'image',
    image: {
      url: 'https://images.unsplash.com/photo-1699950866841-e0de4adb9123?q=80&w=1746&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Gil Scott-Heron',
      caption: 'Will not be televised',
    },
  },
}

export const WithoutCaption: Story = {
  args: {
    type: 'image',
    image: {
      url: 'https://images.unsplash.com/photo-1699950866841-e0de4adb9123?q=80&w=1746&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Gil Scott-Heron',
    },
  },
}
