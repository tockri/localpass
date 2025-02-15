import { notImpl } from '../util/Nop'
import { AsyncResult } from './'

export interface SessionService {
  isSigned(): AsyncResult<boolean>
  signUp(password: string): AsyncResult<void>
  signIn(password: string): AsyncResult<void>
}

export const fakeSessionService: SessionService = {
  isSigned: notImpl,
  signUp: notImpl,
  signIn: notImpl
}
