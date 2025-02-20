import type { Meta, StoryObj } from '@storybook/vue3'

import SignUpForm from './SignUpForm.vue'

const meta = {
  title: 'Signup/SignUpForm',
  component: SignUpForm,
  tags: [],
  argTypes: {},
  args: {}
} satisfies Meta<typeof SignUpForm>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {}
}
