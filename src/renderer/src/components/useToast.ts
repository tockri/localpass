import { nextTick, Ref, ref } from 'vue'

const showToast = ref(false)
const toastMessage = ref('')

type ToastModel = {
  showToast: Ref<boolean>
  toastMessage: Ref<string>
  show: (message: string) => void
  hide: () => void
}

export const useToast = (): ToastModel => {
  const show = (message: string): Promise<void> => {
    toastMessage.value = message
    showToast.value = true
    return nextTick()
  }
  const hide = (): Promise<void> => {
    showToast.value = false
    return nextTick()
  }
  return {
    showToast,
    toastMessage,
    show,
    hide
  }
}
