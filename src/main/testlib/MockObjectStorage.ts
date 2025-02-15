import { ObjectStorage } from '../util/ObjectStrage'

export class MockObjectStorage<T> implements ObjectStorage<T> {
  private _data: T | undefined = undefined

  available(): boolean {
    return this._data !== undefined
  }

  async get(): Promise<T> {
    if (this._data === undefined) {
      throw new Error('Data is not set')
    }
    return this._data
  }

  async put(data: T): Promise<void> {
    this._data = data
  }
}
