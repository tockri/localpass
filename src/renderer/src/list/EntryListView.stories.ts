import type { Meta, StoryObj } from '@storybook/vue3'

import EntryListView from './EntryListView.vue'

const meta = {
  title: 'List/EntryListView',
  component: EntryListView,
  tags: [],
  argTypes: {},
  args: {}
} satisfies Meta<typeof EntryListView>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {}
}
