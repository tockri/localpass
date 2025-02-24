import { PassEntry } from '@common/interface'
import { useBackend } from '@renderer/ipc/BackendClient'
import { nextTick, ref, Ref } from 'vue'

export type PassEntryListModel = {
  passEntryList: Ref<readonly PassEntry[]>
  init: () => Promise<void>
  create: () => Promise<void>
  update: (id: string, input: Partial<PassEntry>) => Promise<void>
  remove: (id: string) => Promise<void>
}

const init = (list: Ref<readonly PassEntry[]>) => async (): Promise<void> => {
  const backend = useBackend()
  const fetchedR = await backend.PassEntry.getAll()
  if (fetchedR.success) {
    list.value = fetchedR.value
  }
}

const create = (list: Ref<readonly PassEntry[]>) => async (): Promise<void> => {
  const backend = useBackend()
  const createdR = await backend.PassEntry.create()
  if (createdR.success) {
    list.value = [...list.value, createdR.value]
  }
}

const update =
  (list: Ref<readonly PassEntry[]>) =>
  async (id: string, input: Partial<PassEntry>): Promise<void> => {
    const backend = useBackend()
    const target = list.value.find((entry) => entry.id === id)
    if (!target) {
      return
    }
    const updatedR = await backend.PassEntry.update(id, input)
    if (updatedR.success) {
      list.value = list.value.map((entry) => (entry.id === id ? { ...entry, ...input } : entry))
    }
  }

const remove =
  (list: Ref<readonly PassEntry[]>) =>
  async (id: string): Promise<void> => {
    const backend = useBackend()
    const removedR = await backend.PassEntry.remove(id)
    if (removedR.success) {
      list.value = list.value.filter((entry) => entry.id !== id)
    }
    await nextTick()
  }

export const usePassEntryListModel = (): PassEntryListModel => {
  const list = ref<readonly PassEntry[]>([])
  return {
    passEntryList: list,
    init: init(list),
    create: create(list),
    update: update(list),
    remove: remove(list)
  }
}
