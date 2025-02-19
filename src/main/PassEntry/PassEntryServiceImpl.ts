import { AsyncResult, PassEntry, PassEntryService } from '@common/interface'
import { resultifyAsync } from '@common/interface/Result'
import { IdGenerator } from '../util/IdGenerator'
import { ObjectStorage } from '../util/ObjectStrage'

export class PassEntryServiceImpl implements PassEntryService {
  private _storage: ObjectStorage<readonly PassEntry[]> | null = null

  constructor(readonly idGenerator: IdGenerator) {}

  setStorage(storage: ObjectStorage<readonly PassEntry[]>): void {
    this._storage = storage
  }

  private get storage(): ObjectStorage<readonly PassEntry[]> {
    if (this._storage === null) {
      throw new Error('Storage is not set')
    }
    return this._storage
  }

  async getAll(): AsyncResult<readonly PassEntry[]> {
    return resultifyAsync(() => this.storage.get())
  }

  create(): AsyncResult<PassEntry> {
    return resultifyAsync(async () => {
      const data = this.storage.get()
      const entry: PassEntry = {
        id: this.idGenerator.generate(),
        label: '',
        attributes: []
      }
      await this.storage.put([...data, entry])
      return entry
    })
  }

  update(id: string, input: Partial<PassEntry>): AsyncResult<void> {
    return resultifyAsync(async () => {
      const data = this.storage.get()
      const index = data.findIndex((entry) => entry.id === id)
      if (index === -1) {
        throw new Error(`Not found: ${id}`)
      }

      await this.storage.put(
        data.map((entry, i) => (i === index ? { ...entry, ...input, id } : entry))
      )
    })
  }

  remove(id: string): AsyncResult<void> {
    return resultifyAsync(async () => {
      const data = this.storage.get()
      const index = data.findIndex((entry) => entry.id === id)
      if (index === -1) {
        throw new Error(`Not found: ${id}`)
      }

      await this.storage.put(data.filter((entry) => entry.id !== id))
    })
  }
}
