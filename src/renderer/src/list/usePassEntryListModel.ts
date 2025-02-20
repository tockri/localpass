import { PassEntry, PassEntryAttribute } from '@common/interface'
import { useBackend } from '@renderer/ipc/BackendClient'
import { ref, Ref } from 'vue'

export type PassEntryListModel = {
  list: Ref<readonly PassEntry[]>
  init: () => Promise<void>
  create: () => Promise<void>
  updateLabel: (id: string, label: string) => Promise<void>
  remove: (id: string) => Promise<void>
  addAttribute: (id: string, type: PassEntryAttribute['type']) => Promise<void>
  removeAttribute: (id: string, index: number) => Promise<void>
  updateAttributeLabel: (id: string, index: number, label: string) => Promise<void>
  updateAttributeValue: (id: string, index: number, value: string) => Promise<void>
}

const update = (list: Ref<readonly PassEntry[]>) => async (): Promise<void> => {
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

const updateLabel =
  (list: Ref<readonly PassEntry[]>) =>
  async (id: string, label: string): Promise<void> => {
    const backend = useBackend()
    const target = list.value.find((entry) => entry.id === id)
    if (!target) {
      return
    }
    const updatedR = await backend.PassEntry.update(id, { label })
    if (updatedR.success) {
      list.value = list.value.map((entry) => (entry.id === id ? { ...entry, label } : entry))
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
  }

const addAttribute =
  (list: Ref<readonly PassEntry[]>) =>
  async (id: string, type: PassEntryAttribute['type']): Promise<void> => {
    const backend = useBackend()
    const target = list.value.find((entry) => entry.id === id)
    if (!target) {
      return
    }
    const input: Partial<PassEntry> = {
      attributes: [...target.attributes, { type, label: '', value: '' }]
    }
    const updatedR = await backend.PassEntry.update(id, input)
    if (updatedR.success) {
      list.value = list.value.map((entry) => (entry.id === id ? { ...entry, ...input } : entry))
    }
  }

const removeAttribute =
  (list: Ref<readonly PassEntry[]>) =>
  async (id: string, index: number): Promise<void> => {
    const backend = useBackend()
    const target = list.value.find((entry) => entry.id === id)
    if (!target) {
      return
    }
    const input: Partial<PassEntry> = {
      attributes: target.attributes.filter((_, i) => i !== index)
    }
    const updatedR = await backend.PassEntry.update(id, input)
    if (updatedR.success) {
      list.value = list.value.map((entry) => (entry.id === id ? { ...entry, ...input } : entry))
    }
  }

const updateAttributeLabel =
  (list: Ref<readonly PassEntry[]>) =>
  async (id: string, index: number, label: string): Promise<void> => {
    const backend = useBackend()
    const target = list.value.find((entry) => entry.id === id)
    if (!target) {
      return
    }
    const input: Partial<PassEntry> = {
      attributes: target.attributes.map((attr, i) => (i === index ? { ...attr, label } : attr))
    }
    const updatedR = await backend.PassEntry.update(id, input)
    if (updatedR.success) {
      list.value = list.value.map((entry) => (entry.id === id ? { ...entry, ...input } : entry))
    }
  }

const updateAttributeValue =
  (list: Ref<readonly PassEntry[]>) =>
  async (id: string, index: number, value: string): Promise<void> => {
    const backend = useBackend()
    const target = list.value.find((entry) => entry.id === id)
    if (!target) {
      return
    }
    const input: Partial<PassEntry> = {
      attributes: target.attributes.map((attr, i) => (i === index ? { ...attr, value } : attr))
    }
    const updatedR = await backend.PassEntry.update(id, input)
    if (updatedR.success) {
      list.value = list.value.map((entry) => (entry.id === id ? { ...entry, ...input } : entry))
    }
  }

export const usePassEntryListModel = (): PassEntryListModel => {
  const list = ref<readonly PassEntry[]>([])
  return {
    list,
    init: update(list),
    create: create(list),
    updateLabel: updateLabel(list),
    remove: remove(list),
    addAttribute: addAttribute(list),
    removeAttribute: removeAttribute(list),
    updateAttributeLabel: updateAttributeLabel(list),
    updateAttributeValue: updateAttributeValue(list)
  }
}
