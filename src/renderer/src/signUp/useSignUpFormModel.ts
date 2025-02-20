import { useBackend } from '@renderer/ipc/BackendClient'
import { useSessionModel } from '@renderer/session/useSessionModel'
import { computed, ComputedRef, ref, Ref } from 'vue'
import zxcvbn from 'zxcvbn'

const submit = (password: Ref<string>, errorMessage: Ref<string>) => async (): Promise<void> => {
  const backend = useBackend()
  const session = useSessionModel()
  const result = await backend.Session.signUp(password.value)
  if (result.success) {
    errorMessage.value = ''
    await session.update()
  } else {
    errorMessage.value = result.error
  }
}

type SignUpFormModel = Readonly<{
  password: Ref<string>
  errorMessage: Ref<string>
  score: ComputedRef<number>
  submit: () => Promise<void>
}>

export const useSignUpFormModel = (): SignUpFormModel => {
  const password = ref('')
  const score = computed(() => {
    const z = zxcvbn(password.value)
    return z.score
  })
  const errorMessage = ref('')
  return {
    password,
    errorMessage,
    score,
    submit: submit(password, errorMessage)
  }
}
