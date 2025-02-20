import { Backend } from '@common/interface'
import { MockPassEntryService } from './MockPassEntryService'
import { MockSessionService } from './MockSessionService'

export const createMockBackend = (): Backend => {
  return {
    Session: new MockSessionService('Session', 500),
    PassEntry: new MockPassEntryService('PassEntry', 500)
  }
}
