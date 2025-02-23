import { computed, nextTick, ref, Ref } from 'vue'

type EditModel = {
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

export const useEditModel = (arg: {
  value: string
  type?: 'text' | 'password'
  onSubmit: (value: string) => void
  onCopied: ((value: string) => void) | null | false
}): EditModel => {
  const editing = ref(false)
  const editingValue = ref(arg.value)
  const showing = ref(false)
  const displayValue = computed(() => {
    return arg.type === 'password' && !showing.value
      ? '•'.repeat(Math.min(12, arg.value.length))
      : arg.value
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
    editingValue.value = arg.value
    return nextTick()
  }
  const cancel = (): Promise<void> => {
    editing.value = false
    return nextTick()
  }
  const submit = (): Promise<void> => {
    arg.onSubmit(editingValue.value)
    cancel()
    return nextTick()
  }
  // クリップボードにコピー
  const copy = (): void => {
    if (arg.onCopied) {
      navigator.clipboard.writeText(arg.value)
      arg.onCopied(arg.value)
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

type DisplayModel = {
  value: Ref<string>
  showing: Ref<boolean>
  show: () => Promise<void>
  hide: () => Promise<void>
}

export const useDisplayModel = (arg: {
  value: string
  type: 'text' | 'password'
}): DisplayModel => {
  const showing = ref(false)
  const show = (): Promise<void> => {
    showing.value = true
    return nextTick()
  }
  const hide = (): Promise<void> => {
    showing.value = false
    return nextTick()
  }
  const value = computed(() => {
    return arg.type === 'password' && !showing.value
      ? '•'.repeat(Math.min(12, arg.value.length))
      : arg.value
  })

  return {
    value,
    showing,
    show,
    hide
  }
}
