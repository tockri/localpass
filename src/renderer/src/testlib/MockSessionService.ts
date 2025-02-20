import { AsyncResult, SessionService, SessionState } from '@common/interface'
import { MockUtil } from './MockUtil'

export class MockSessionService implements SessionService {
  private util: MockUtil
  private status: SessionState = 'NotSet'

  constructor(serviceName: string, waitMs: number) {
    this.util = new MockUtil(serviceName, waitMs)
  }

  getStatus(): AsyncResult<SessionState> {
    return this.util.wrap('getStatus', () => this.status)
  }

  signUp(_password: string): AsyncResult<void> {
    return this.util.wrap('signUp', () => {
      this.status = 'SignedIn'
    })
  }

  signIn(password: string): AsyncResult<void> {
    return this.util.wrap('signIn', () => {
      if (password === 'wrong') {
        throw new Error('パスワードが間違っています')
      }
      this.status = 'SignedIn'
    })
  }

  signOut(): AsyncResult<void> {
    return this.util.wrap('signOut', () => {
      this.status = 'SignedOut'
    })
  }
}
