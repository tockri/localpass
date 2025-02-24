import { AsyncResult, PassEntry, PassEntryService } from '@common/interface'
import { MockUtil } from './MockUtil'

export class MockPassEntryService implements PassEntryService {
  private util: MockUtil

  constructor(serviceName: string, waitMs: number) {
    this.util = new MockUtil(serviceName, waitMs)
  }

  getAll(): AsyncResult<readonly PassEntry[]> {
    return this.util.wrap('getAll', () => [
      {
        id: '1',
        label: 'label1',
        attributes: [
          {
            type: 'string',
            label: 'attr1',
            value: 'value1'
          },
          {
            type: 'password',
            label: 'attr2',
            value: 'value2'
          }
        ]
      } satisfies PassEntry,
      {
        id: '2',
        label: 'label2',
        attributes: [
          {
            type: 'string',
            label: 'attr3',
            value: 'value3'
          },
          {
            type: 'password',
            label: 'attr4',
            value: 'value4'
          }
        ]
      } satisfies PassEntry
    ])
  }

  create(): AsyncResult<PassEntry> {
    return this.util.wrap(
      'create',
      () =>
        ({
          id: '3',
          label: '',
          attributes: []
        }) satisfies PassEntry
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(_id: string, _input: Partial<PassEntry>): AsyncResult<void> {
    return this.util.wrap('update', () => {})
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  remove(_id: string): AsyncResult<void> {
    return this.util.wrap('remove', () => {})
  }
}
