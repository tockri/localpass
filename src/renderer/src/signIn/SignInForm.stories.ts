import type { Meta, StoryObj } from '@storybook/vue3'

import SignInForm from './SignInForm.vue'

const meta = {
  title: 'Signin/SignInForm',
  component: SignInForm,
  tags: [],
  argTypes: {},
  args: {}
} satisfies Meta<typeof SignInForm>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {}
}
