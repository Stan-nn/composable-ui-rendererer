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
      url: 'https://images.unsplash.com/photo-1492037766660-2a56f9eb3fcb?q=80&w=1200&auto=format&fit=crop',
      alt: 'Blue art neon sign turned on',
      caption: 'Photo by Unsplash',
    },
  },
}

export const WithoutCaption: Story = {
  args: {
    type: 'image',
    image: {
      url: 'https://images.unsplash.com/photo-1492037766660-2a56f9eb3fcb?q=80&w=1200&auto=format&fit=crop',
      alt: 'Blue art neon sign turned on',
    },
  },
}
