import type { Meta, StoryObj } from '@storybook/vue3'
import { ref, watch } from 'vue'
import EditableField from './EditableField.vue'

const meta = {
  title: 'Components/EditableField',
  component: EditableField,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'password']
    },
    wrapDisplay: {
      control: 'boolean'
    }
  },
  args: {
    modelValue: ref('Editable text'),
    type: 'text',
    wrapDisplay: false
  }
} satisfies Meta<typeof EditableField>

export default meta

type Story = StoryObj<typeof meta>

const renderFactory: Story['render'] = (args: Story['args']) => ({
  components: { EditableField },
  setup() {
    const value = ref(args?.modelValue ?? '')
    watch(
      () => args?.modelValue,
      (next) => {
        if (typeof next === 'string' && next !== value.value) {
          value.value = next
        }
      }
    )
    return { args, value }
  },
  template: '<EditableField v-model="value" v-bind="args" />'
})

export const Text: Story = {
  render: renderFactory,
  args: {
    modelValue: ref('Editable text'),
    type: 'text',
    wrapDisplay: false
  }
}

export const Password: Story = {
  render: renderFactory,
  args: {
    modelValue: ref('secret-value'),
    type: 'password',
    copyMessage: 'Copied password to clipboard'
  }
}

export const Wrapped: Story = {
  render: renderFactory,
  args: {
    modelValue: ref(
      'This is a longer piece of text that will wrap when wrapDisplay is enabled to simulate note fields.'
    ),
    wrapDisplay: true
  }
}
