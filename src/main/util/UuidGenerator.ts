import { v4 as uuidv4 } from 'uuid'
import { IdGenerator } from './IdGenerator'

export class UuidGenerator implements IdGenerator {
  constructor(readonly prefix: string) {}

  generate(): string {
    return this.prefix + ':' + uuidv4()
  }
}
