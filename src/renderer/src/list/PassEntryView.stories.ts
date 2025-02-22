import type { Meta, StoryObj } from '@storybook/vue3'

import PassEntryView from './PassEntryView.vue'

const meta = {
  title: 'List/PassEntryView',
  component: PassEntryView,
  tags: [],
  argTypes: {},
  args: {
    entry: {
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
    }
  }
} satisfies Meta<typeof PassEntryView>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {}
}
