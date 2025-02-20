import { notImpl } from '../util/Nop'
import { AsyncResult } from './'

export type SessionState = 'NotSet' | 'SignedIn' | 'SignedOut'

export interface SessionService {
  getStatus(): AsyncResult<SessionState>
  signUp(password: string): AsyncResult<void>
  signIn(password: string): AsyncResult<void>
  signOut(): AsyncResult<void>
}

export const fakeSessionService: SessionService = {
  getStatus: notImpl,
  signUp: notImpl,
  signIn: notImpl,
  signOut: notImpl
}
