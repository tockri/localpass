import { AsyncResult, PassEntry, SessionService } from '../../common/interface'
import { resultifyAsync } from '../../common/interface/Result'
import { PassEntryValidator } from '../PassEntry/PassEntryValidator'
import { CryptoFilter } from '../util/CryptoFilter'
import { FileObjectStorage } from '../util/FileObjectStorage'
import { FileUtil } from '../util/FileUtil'
import { ObjectStorage } from '../util/ObjectStrage'

export class SessionServiceImpl implements SessionService {
  constructor(
    readonly passEntryPath: string,
    readonly onCreateStorage: (storage: ObjectStorage<readonly PassEntry[]>) => void
  ) {}

  async isSigned(): AsyncResult<boolean> {
    return resultifyAsync(() => {
      return FileUtil.exists(this.passEntryPath)
    })
  }

  private createStorage(password: string): FileObjectStorage<readonly PassEntry[]> {
    return new FileObjectStorage<readonly PassEntry[]>(
      this.passEntryPath,
      new CryptoFilter(password),
      PassEntryValidator.validate
    )
  }

  signIn(password: string): AsyncResult<void> {
    return resultifyAsync(async () => {
      if (!FileUtil.exists(this.passEntryPath)) {
        throw new Error('Data not found')
      }
      const storage = this.createStorage(password)
      try {
        await storage.get()
        this.onCreateStorage(storage)
      } catch (e) {
        throw new Error('Invalid password')
      }
    })
  }

  signUp(password: string): AsyncResult<void> {
    return resultifyAsync(async () => {
      if (FileUtil.exists(this.passEntryPath)) {
        throw new Error('Data already exists')
      }
      const storage = this.createStorage(password)
      await storage.put([])
      this.onCreateStorage(storage)
    })
  }
}
