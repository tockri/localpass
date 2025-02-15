export interface ObjectStorage<T> {
  available(): boolean
  get(): Promise<T>
  put(data: T): Promise<void>
}
