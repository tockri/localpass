import { AsyncResult, PassEntry, SessionService, SessionState } from '@common/interface'
import { resultifyAsync } from '@common/interface/Result'
import { PassEntryValidator } from '../PassEntry/PassEntryValidator'
import { CryptoFilter } from '../util/CryptoFilter'
import { FileObjectStorage } from '../util/FileObjectStorage'
import { FileUtil } from '../util/FileUtil'
import { ObjectStorage } from '../util/ObjectStrage'

export class SessionServiceImpl implements SessionService {
  private _status: SessionState = 'NotSet'

  constructor(
    readonly passEntryPath: string,
    readonly onCreateStorage: (storage: ObjectStorage<readonly PassEntry[]>) => void
  ) {}

  async getStatus(): AsyncResult<SessionState> {
    return resultifyAsync(() => {
      if (!FileUtil.exists(this.passEntryPath)) {
        this._status = 'NotSet'
        return this._status
      } else {
        return this._status
      }
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
        this._status = 'SignedIn'
        this.onCreateStorage(storage)
      } catch {
        this._status = 'SignedOut'
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
      this._status = 'SignedIn'
      this.onCreateStorage(storage)
    })
  }
}
