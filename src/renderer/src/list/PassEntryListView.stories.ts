import type { Meta, StoryObj } from '@storybook/vue3'

import PassEntryListView from './PassEntryListView.vue'

const meta = {
  title: 'List/PassEntryListView',
  component: PassEntryListView,
  tags: [],
  argTypes: {},
  args: {}
} satisfies Meta<typeof PassEntryListView>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {}
}
