import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { PassEntry } from '../../common/interface'
import { PassEntryValidator } from '../PassEntry/PassEntryValidator'
import { MockTextFilter } from '../testlib/MockTextFilter'
import { FileObjectStorage } from './FileObjectStorage'
import { FileUtil } from './FileUtil'

describe('FileObjectStorage', () => {
  const path = FileUtil.projectPath('testData/FileObjectStorage.test.data')
  const storage = new FileObjectStorage<readonly PassEntry[]>(
    path,
    new MockTextFilter(),
    PassEntryValidator.validate
  )

  beforeAll(() => FileUtil.unlink(path))
  afterAll(() => FileUtil.unlink(path))

  test.sequential('notAvailableOnInit', async () => {
    // Arrange

    // Act
    const result = storage.available()

    // Assert
    expect(result).toBe(false)
  })

  test.sequential('availableAfterPut', async () => {
    // Arrange
    await storage.put([])

    // Act
    const result = storage.available()

    // Assert
    expect(result).toBe(true)
  })

  test.sequential('getAfterPut', async () => {
    // Arrange
    const data: readonly PassEntry[] = [
      {
        id: 'id',
        label: 'label',
        attributes: []
      }
    ]
    await storage.put(data)

    // Act
    const fileContent = await FileUtil.read(path)
    const result = await storage.get()

    // Assert
    expect(fileContent).toEqual('encoded:[{"id":"id","label":"label","attributes":[]}]')
    expect(result).toEqual(data)
  })

  test.sequential('put multiple entries', async () => {
    // Arrange
    const data: readonly PassEntry[] = [
      {
        id: 'id1',
        label: 'label1',
        attributes: [
          {
            type: 'string',
            label: 'label',
            value: 'value'
          },
          {
            type: 'password',
            label: 'label',
            value: 'value'
          }
        ]
      },
      {
        id: 'id2',
        label: 'label2',
        attributes: []
      }
    ]
    await storage.put(data)

    // Act
    const fileContent = await FileUtil.read(path)
    const result = await storage.get()

    // Assert
    expect(fileContent).toEqual(
      'encoded:[{"id":"id1","label":"label1","attributes":[{"type":"string","label":"label","value":"value"},' +
        '{"type":"password","label":"label","value":"value"}]},{"id":"id2","label":"label2","attributes":[]}]'
    )
    expect(result).toEqual(data)
  })
})
