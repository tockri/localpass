import { FileUtil } from './FileUtil'
import { ObjectStorage } from './ObjectStrage'
import { TextFilter } from './TextFilter'

export class FileObjectStorage<T> implements ObjectStorage<T> {
  static async load<T>(
    path: string,
    filter: TextFilter,
    validator: (obj: unknown) => obj is T,
    defaultData: T
  ): Promise<FileObjectStorage<T>> {
    if (FileUtil.exists(path)) {
      const content = await FileUtil.read(path)
      const obj = JSON.parse(filter.out(content))
      if (validator(obj)) {
        return new FileObjectStorage<T>(path, filter, obj)
      }
    } else {
      return new FileObjectStorage<T>(path, filter, defaultData)
    }
    throw new Error('Failed to load data')
  }

  private constructor(
    private readonly path: string,
    private readonly filter: TextFilter,
    private data: T
  ) {}

  available(): boolean {
    return FileUtil.exists(this.path)
  }

  get(): Readonly<T> {
    return this.data
  }

  async put(data: T): Promise<void> {
    this.data = data
    const content = JSON.stringify(data)
    await FileUtil.write(this.path, this.filter.in(content))
  }
}
