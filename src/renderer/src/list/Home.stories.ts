import type { Meta, StoryObj } from '@storybook/vue3'

import Home from './Home.vue'

const meta = {
  title: 'Home/Home',
  component: Home,
  tags: [],
  argTypes: {},
  args: {}
} satisfies Meta<typeof Home>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {}
}
