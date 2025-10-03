import { AsyncResult, PassEntry, PassEntryService } from '@common/interface'
import { MockUtil } from './MockUtil'

export class MockPassEntryService implements PassEntryService {
  private util: MockUtil

  constructor(serviceName: string, waitMs: number) {
    this.util = new MockUtil(serviceName, waitMs)
  }

  getAll(): AsyncResult<readonly PassEntry[]> {
    return this.util.wrap('getAll', () =>
      new Array(30).fill(0).map(
        (_, i) =>
          ({
            id: `id-${i}`,
            label: `label${i}`,
            attributes: [
              {
                type: 'string',
                label: 'attr1',
                value: `value1-${i}`
              },
              {
                type: 'password',
                label: 'attr2',
                value: `value2-${i}`
              }
            ]
          }) satisfies PassEntry
      )
    )
  }

  create(): AsyncResult<PassEntry> {
    return this.util.wrap(
      'create',
      () =>
        ({
          id: '3',
          label: '',
          attributes: [
            {
              type: 'string',
              label: 'userName',
              value: ''
            },
            {
              type: 'password',
              label: 'password',
              value: ''
            }
          ]
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
