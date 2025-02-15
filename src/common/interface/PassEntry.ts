import { notImpl } from '../util/Nop'
import { Entity, EntityInput } from './Entity'
import { AsyncResult } from './Result'

export type PassEntry = Entity &
  Readonly<{
    label: string
    attributes: readonly PassEntryAttribute[]
  }>

export type PassEntryAttribute = Readonly<{
  type: 'string' | 'password'
  label: string
  value: string
}>

export interface PassEntryService {
  getAll(): AsyncResult<readonly PassEntry[]>
  create(): AsyncResult<PassEntry>
  update(id: string, input: EntityInput<PassEntry>): AsyncResult<void>
  remove(id: string): AsyncResult<void>
}

export const fakePassEntryService: PassEntryService = {
  getAll: notImpl,
  create: notImpl,
  update: notImpl,
  remove: notImpl
}
