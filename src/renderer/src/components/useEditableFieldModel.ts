import { computed, ModelRef, nextTick, ref, Ref, unref, watch } from 'vue'
import { useToast } from './useToast'

type EditableFieldModel = {
  editing: Ref<boolean>
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

const normalize = (value: string | null | undefined): string => value ?? ''

export const useEditableFieldModel = (arg: {
  model: ModelRef<string>
  type?: 'text' | 'password'
  copyMessage?: string
}): EditableFieldModel => {
  const initialValue = normalize(unref(arg.model))
  const editing = ref(false)
  const innerValue = ref(initialValue)
  const editingValue = ref(initialValue)
  const showing = ref(false)
  const copyEnabled = !!arg.copyMessage

  watch(
    () => initialValue,
    (newInitialValue) => {
      innerValue.value = newInitialValue
      if (!editing.value) {
        editingValue.value = newInitialValue
      }
    }
  )

  const displayValue = computed(() => {
    return arg.type === 'password' && !showing.value
      ? '*'.repeat(Math.min(12, innerValue.value.length))
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
  const endEdit = (): Promise<void> => {
    editing.value = false
    return nextTick()
  }
  const cancel = endEdit
  const submit = (): Promise<void> => {
    arg.model.value = editingValue.value
    innerValue.value = editingValue.value
    return endEdit()
  }
  const tm = useToast()
  const copy = (): void => {
    if (copyEnabled) {
      navigator.clipboard.writeText(innerValue.value)
      if (arg.copyMessage) {
        tm.show(arg.copyMessage)
      }
    }
  }
  return {
    editing,
    editingValue,
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
