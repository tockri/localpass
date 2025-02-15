import { FileUtil } from './FileUtil'
import { ObjectStorage } from './ObjectStrage'
import { TextFilter } from './TextFilter'

export class FileObjectStorage<T> implements ObjectStorage<T> {
  private data: T | undefined

  constructor(
    private readonly path: string,
    private readonly filter: TextFilter,
    private readonly validator: (obj: unknown) => obj is T
  ) {}

  available(): boolean {
    return FileUtil.exists(this.path)
  }

  async get(): Promise<T> {
    if (this.data === undefined) {
      const content = await FileUtil.read(this.path)
      const obj = JSON.parse(this.filter.out(content))
      if (this.validator(obj)) {
        this.data = obj
      } else {
        throw new Error('Failed to load data')
      }
    }
    return this.data
  }

  async put(data: T): Promise<void> {
    this.data = data
    const content = JSON.stringify(data)
    await FileUtil.write(this.path, this.filter.in(content))
  }
}
