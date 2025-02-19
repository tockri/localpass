import { AsyncResult, PassEntry, SessionService, SessionState } from '@common/interface'
import { resultifyAsync } from '@common/interface/Result'
import { PassEntryValidator } from '../PassEntry/PassEntryValidator'
import { CryptoFilter } from '../util/CryptoFilter'
import { FileObjectStorage } from '../util/FileObjectStorage'
import { FileUtil } from '../util/FileUtil'
import { ObjectStorage } from '../util/ObjectStrage'
import zxcvbn from 'zxcvbn'

export class SessionServiceImpl implements SessionService {
  private _status: SessionState = 'NotSet'

  constructor(
    readonly passEntryPath: string,
    readonly onCreateStorage: (storage: ObjectStorage<readonly PassEntry[]>) => void
  ) {}

  private dataExists(): boolean {
    return FileUtil.exists(this.passEntryPath)
  }

  async getStatus(): AsyncResult<SessionState> {
    return resultifyAsync(() => {
      if (!this.dataExists()) {
        this._status = 'NotSet'
        return this._status
      } else {
        return this._status
      }
    })
  }

  private createStorage(password: string): Promise<FileObjectStorage<readonly PassEntry[]>> {
    return FileObjectStorage.load(
      this.passEntryPath,
      new CryptoFilter(password),
      PassEntryValidator.validate,
      []
    )
  }

  signIn(password: string): AsyncResult<void> {
    return resultifyAsync(async () => {
      if (!this.dataExists()) {
        throw new Error('Data not found')
      }
      try {
        const storage = await this.createStorage(password)
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
      if (this.dataExists()) {
        throw new Error('Data already exists')
      } else if (zxcvbn(password).score < 3) {
        throw new Error('Password is too weak')
      }
      const storage = await this.createStorage(password)
      await storage.put([])
      this._status = 'SignedIn'
      this.onCreateStorage(storage)
    })
  }
}
