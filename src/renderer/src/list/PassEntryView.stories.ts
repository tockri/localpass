import { PassEntry } from '@common/interface'
import type { Meta, StoryFn } from '@storybook/vue3'
import { nextTick, Ref, ref } from 'vue'
import PassEntryView from './PassEntryView.vue'

type PassEntryViewType = typeof PassEntryView

const meta = {
  title: 'List/PassEntryView',
  component: PassEntryView,
  tags: [],
  argTypes: {}
} satisfies Meta<PassEntryViewType>

export default meta

export const Primary: StoryFn<PassEntryViewType> = () => ({
  components: { PassEntryView },
  setup: (): unknown => {
    const entry: Ref<PassEntry> = ref({
      id: '1',
      label: 'Google Account',
      attributes: [
        {
          type: 'string',
          label: 'Username',
          value: 'myaccount@google.com'
        },
        {
          type: 'password',
          label: 'Password',
          value: 'gsdy9f8hauniw4783ufajksjdlffFFUEUDJFB'
        }
      ]
    })
    return {
      entry,
      onUpdated: async (updates: Partial<PassEntry>): Promise<void> => {
        entry.value = { ...entry.value, ...updates }
        await nextTick()
        console.log('Updated:', entry.value)
      }
    }
  },
  template: '<PassEntryView :entry="entry" @updated="onUpdated" />'
})
