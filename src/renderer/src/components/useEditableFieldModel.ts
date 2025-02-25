import { computed, nextTick, ref, Ref } from 'vue'
import { useToast } from './useToast'

type EditableFieldModel = {
  editing: Ref<boolean>
  //  innerValue: Ref<string>
  displayValue: Ref<string>
  editingValue: Ref<string>
  showing: Ref<boolean>
  show: () => Promise<void>
  hide: () => Promise<void>
  toggle: () => Promise<void>
  start: () => Promise<void>
  cancel: () => Promise<void>
  submit: () => Promise<void>
  copy: () => void
}

export const useEditableFieldModel = (arg: {
  value: string
  type?: 'text' | 'password'
  copyMessage?: string
  onSubmit: (value: string) => void
}): EditableFieldModel => {
  const editing = ref(false)
  const innerValue = ref(arg.value)
  const editingValue = ref(arg.value)
  const showing = ref(false)
  const displayValue = computed(() => {
    return arg.type === 'password' && !showing.value
      ? '•'.repeat(Math.min(12, innerValue.value.length))
      : innerValue.value
  })
  const show = (): Promise<void> => {
    showing.value = true
    return nextTick()
  }
  const hide = (): Promise<void> => {
    showing.value = false
    return nextTick()
  }
  const toggle = (): Promise<void> => {
    showing.value = !showing.value
    return nextTick()
  }
  const start = (): Promise<void> => {
    editing.value = true
    editingValue.value = innerValue.value
    return nextTick()
  }
  const cancel = (): Promise<void> => {
    editing.value = false
    return nextTick()
  }
  const submit = (): Promise<void> => {
    arg.onSubmit(editingValue.value)
    innerValue.value = editingValue.value
    return cancel()
  }
  // クリップボードにコピー
  const tm = useToast()
  const copy = (): void => {
    if (arg.copyMessage) {
      navigator.clipboard.writeText(innerValue.value)
      tm.show(arg.copyMessage)
    }
  }
  return {
    editing,
    editingValue,
    //innerValue,
    displayValue,
    showing,
    show,
    hide,
    toggle,
    start,
    cancel,
    submit,
    copy
  }
}
