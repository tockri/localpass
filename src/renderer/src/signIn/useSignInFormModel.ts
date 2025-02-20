import { useBackend } from '@renderer/ipc/BackendClient'
import { useSessionModel } from '@renderer/session/useSessionModel'
import { ref, Ref } from 'vue'

const submit = (password: Ref<string>, errorMessage: Ref<string>) => async (): Promise<void> => {
  const backend = useBackend()
  const session = useSessionModel()
  const result = await backend.Session.signIn(password.value)
  if (result.success) {
    errorMessage.value = ''
    await session.update()
  } else {
    errorMessage.value = result.error
  }
}

type SignInFormModel = Readonly<{
  password: Ref<string>
  errorMessage: Ref<string>
  submit: () => Promise<void>
}>

export const useSignInFormModel = (): SignInFormModel => {
  const password = ref('')
  const errorMessage = ref('')
  return {
    password,
    errorMessage,
    submit: submit(password, errorMessage)
  }
}
