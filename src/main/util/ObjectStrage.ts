export interface ObjectStorage<T> {
  available(): boolean
  get(): Readonly<T>
  put(data: T): Promise<void>
}
