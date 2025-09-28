import { PassEntry } from '@common/interface'
import { useBackend } from '@renderer/ipc/BackendClient'
import { deepToRaw } from '@renderer/util/deepToRaw'
import { nextTick, ref, Ref } from 'vue'
import { DropResult } from 'vue-dndrop'

export type PassEntryListModel = {
  passEntryList: Ref<PassEntry[]>
  init: () => Promise<void>
  create: () => Promise<PassEntry | null>
  update: (id: string, input: Partial<PassEntry>) => Promise<void>
  remove: (id: string) => Promise<void>
  arrange: (dropResult: DropResult) => Promise<void>
}

const init = (list: Ref<PassEntry[]>) => async (): Promise<void> => {
  const backend = useBackend()
  const fetchedR = await backend.PassEntry.getAll()
  if (fetchedR.success) {
    list.value = fetchedR.value.slice()
  }
}

const create = (list: Ref<PassEntry[]>) => async (): Promise<PassEntry | null> => {
  const backend = useBackend()
  const createdR = await backend.PassEntry.create()
  if (createdR.success) {
    list.value.push(createdR.value)
    return createdR.value
  }
  return null
}

const update =
  (list: Ref<PassEntry[]>) =>
  async (id: string, input: Partial<PassEntry>): Promise<void> => {
    const backend = useBackend()
    const idx = list.value.findIndex((entry) => entry.id === id)
    if (idx >= 0) {
      const updatedR = await backend.PassEntry.update(id, deepToRaw(input))
      if (updatedR.success) {
        Object.assign(list.value[idx], input)
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

const arrange =
  (list: Ref<PassEntry[]>) =>
  async (dropResult: DropResult): Promise<void> => {
    const target = list.value[dropResult.removedIndex]
    list.value.splice(dropResult.removedIndex, 1)
    const dstIndex =
      dropResult.addedIndex > dropResult.removedIndex
        ? dropResult.addedIndex - 1
        : dropResult.addedIndex
    list.value.splice(dstIndex, 0, target)
  }

export const usePassEntryListModel = (): PassEntryListModel => {
  const list = ref<PassEntry[]>([])
  return {
    passEntryList: list,
    init: init(list),
    create: create(list),
    update: update(list),
    remove: remove(list),
    arrange: arrange(list)
  }
}
