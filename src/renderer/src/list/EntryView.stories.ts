import type { Meta, StoryFn } from '@storybook/vue3'

import EntryView from './EntryView.vue'
import type { PassEntry } from '@common/interface'

const entry: PassEntry = {
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

export const Primary: StoryFn<typeof EntryView> = () => ({
  components: { EntryView },
  data: () => ({ entry }),
  template: "<EntryView :entry='entry' @updated='() => {}' @remove='() => {}' />"
})
