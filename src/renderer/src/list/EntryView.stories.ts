import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'

import type { PassEntry } from '@common/interface'
import EntryView from './EntryView.vue'

const sampleEntry: PassEntry = {
  id: 'sample-id',
  label: 'Sample Entry',
  attributes: [
    { label: 'Username', value: 'user@example.com', type: 'string' },
    { label: 'Password', value: 'secret', type: 'password' }
  ]
}

const meta = {
  title: 'List/EntryView',
  component: EntryView,
  tags: []
} satisfies Meta<typeof EntryView>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    entry: sampleEntry
  },
  render: (args) => ({
    components: { EntryView },
    setup() {
      const active = ref(args.entry.id)
      return { args, active }
    },
    template: `
      <v-expansion-panels v-model="active">
        <EntryView v-bind="args" />
      </v-expansion-panels>
    `
  })
}
