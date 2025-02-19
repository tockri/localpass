import { SessionState } from '@common/interface'
import { useBackend } from '@renderer/ipc/BackendClient'
import { ref, Ref } from 'vue'

type Status = SessionState | null

const status: Ref<Status> = ref(null)
const errorMessage: Ref<string | null> = ref(null)

const update = async (): Promise<void> => {
  const backend = useBackend()
  const result = await backend.value.Session.getStatus()
  if (result.success) {
    status.value = result.value
  }
}

const submit = async (password: string): Promise<void> => {
  const backend = useBackend()
  const result = await backend.value.Session.signUp(password)
  if (!result.success) {
    errorMessage.value = result.error
  } else {
    await update()
  }
}

export type SignUpModel = Readonly<{
  status: Ref<Status>
  errorMessage: Ref<string | null>
  init: () => Promise<void>
  submit: (password: string) => Promise<void>
}>

export const useSignupModel = (): SignUpModel => {
  return {
    status,
    errorMessage,
    init: update,
    submit
  }
}
