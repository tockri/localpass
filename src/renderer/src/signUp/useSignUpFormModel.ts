import { computed, ComputedRef, ref, Ref } from 'vue'
import zxcvbn from 'zxcvbn'

type SignUpFormModel = Readonly<{
  password: Ref<string>
  score: ComputedRef<number>
}>

export const useSignUpFormModel = (): SignUpFormModel => {
  const password = ref('')
  const score = computed(() => {
    const z = zxcvbn(password.value)
    return z.score
  })
  return {
    password,
    score
  }
}
