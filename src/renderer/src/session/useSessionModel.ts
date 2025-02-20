import { SessionState } from '@common/interface'
import { useBackend } from '@renderer/ipc/BackendClient'
import { ref, Ref } from 'vue'

type Status = SessionState | null

const status: Ref<Status> = ref(null)

const update = async (): Promise<void> => {
  const backend = useBackend()
  const result = await backend.value.Session.getStatus()
  if (result.success) {
    status.value = result.value
  }
}

export type SessionModel = Readonly<{
  status: Ref<Status>
  update: () => Promise<void>
}>

export const useSessionModel = (): SessionModel => {
  return {
    status,
    update
  }
}
