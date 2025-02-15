import { ipcMain } from 'electron'
import type { Backend } from '../common/interface'
import { BackendChannel, isBackendMessage } from '../common/interface'
import { PassEntryServiceImpl } from './PassEntry/PassEntryServiceImpl'
import { SessionServiceImpl } from './Session/SessionServiceImpl'
import { FileUtil } from './util/FileUtil'
import { UuidGenerator } from './util/UuidGenerator'

const buildMainBackend = (): Backend => {
  const passEntryPath = FileUtil.configPath('passEntry.data')
  const passEntryService = new PassEntryServiceImpl(new UuidGenerator('passEntry'))
  return {
    PassEntry: passEntryService,
    Session: new SessionServiceImpl(passEntryPath, (storage) => {
      passEntryService.setStorage(storage)
    })
  }
}

let started = false

const start = (): void => {
  if (started) {
    return
  }
  const backend = buildMainBackend()
  ipcMain.handle(BackendChannel.channelName, (_evt, message) => {
    if (isBackendMessage(message)) {
      const service = backend[message.domain]
      const method = service[message.method] as (...args: unknown[]) => unknown
      return method.apply(service, message.args)
    }
    console.warn('Backend message not recognized:', message)
    return null
  })
  console.log('MessageReceiver started')
  started = true
}

export const MessageReceiver = {
  start
} as const
