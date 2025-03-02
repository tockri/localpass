import { PassEntry } from '@common/interface'
import { useBackend } from '@renderer/ipc/BackendClient'
import { deepToRaw } from '@renderer/util/deepToRaw'
import { nextTick, Ref, ref } from 'vue'

export type PassEntryListModel = {
  passEntryList: Ref<readonly PassEntry[]>
  init: () => Promise<void>
  create: () => Promise<void>
  update: (id: string, input: Partial<PassEntry>) => Promise<void>
  remove: (id: string) => Promise<void>
}

const init = (list: Ref<PassEntry[]>) => async (): Promise<void> => {
  const backend = useBackend()
  const fetchedR = await backend.PassEntry.getAll()
  if (fetchedR.success) {
    list.value.push(...fetchedR.value)
  }
}

const create = (list: Ref<PassEntry[]>) => async (): Promise<void> => {
  const backend = useBackend()
  const createdR = await backend.PassEntry.create()
  if (createdR.success) {
    list.value.push(createdR.value)
  }
}

const update =
  (list: Ref<PassEntry[]>) =>
  async (id: string, input: Partial<PassEntry>): Promise<void> => {
    const backend = useBackend()
    const idx = list.value.findIndex((entry) => entry.id === id)
    if (idx >= 0) {
      const updatedR = await backend.PassEntry.update(id, deepToRaw(input))
      if (updatedR.success) {
        list.value.splice(idx, 1, { ...list.value[idx], ...input })
      }
    }
  }

const remove =
  (list: Ref<PassEntry[]>) =>
  async (id: string): Promise<void> => {
    const backend = useBackend()
    const removedR = await backend.PassEntry.remove(id)
    if (removedR.success) {
      const idx = list.value.findIndex((entry) => entry.id === id)
      if (idx !== -1) {
        list.value.splice(idx, 1)
      }
    }
    await nextTick()
  }

export const usePassEntryListModel = (): PassEntryListModel => {
  const list = ref<PassEntry[]>([])
  return {
    passEntryList: list,
    init: init(list),
    create: create(list),
    update: update(list),
    remove: remove(list)
  }
}
