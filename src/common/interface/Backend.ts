import { fakePassEntryService, PassEntryService } from './PassEntry'
import { fakeSessionService, SessionService } from './Session'

export type Backend = Readonly<{
  Session: SessionService
  PassEntry: PassEntryService
}>

export const fakeBackend: Backend = {
  Session: fakeSessionService,
  PassEntry: fakePassEntryService
}

export type BackendDomain = keyof Backend

export type BackendMethodName<D extends BackendDomain> = keyof Backend[D]

export type BackendMessage<D extends BackendDomain, M extends BackendMethodName<D>> = Readonly<{
  domain: D
  method: M
  args: unknown[]
}>

export const isBackendMessage = <D extends BackendDomain, M extends BackendMethodName<D>>(
  obj: unknown
): obj is BackendMessage<D, M> => {
  return (
    obj !== null &&
    typeof obj === 'object' &&
    typeof (obj as BackendMessage<D, M>).domain === 'string' &&
    typeof (obj as BackendMessage<D, M>).method === 'string' &&
    Array.isArray((obj as BackendMessage<D, M>).args)
  )
}

export const BackendChannel = {
  channelName: 'backend'
} as const
