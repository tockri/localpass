import { PassEntry, PassEntryAttribute } from '@common/interface'

const validate = (obj: unknown): obj is readonly PassEntry[] =>
  Array.isArray(obj) && obj.every(isPassEntry)

const isPassEntry = (obj: unknown): obj is PassEntry =>
  obj !== null &&
  typeof obj === 'object' &&
  typeof (obj as PassEntry).id === 'string' &&
  typeof (obj as PassEntry).label === 'string' &&
  Array.isArray((obj as PassEntry).attributes) &&
  (obj as PassEntry).attributes.every(isPassEntryAttribute)

const isPassEntryAttribute = (obj: unknown): obj is PassEntryAttribute =>
  obj !== null &&
  typeof obj === 'object' &&
  typeof (obj as PassEntryAttribute).type === 'string' &&
  typeof (obj as PassEntryAttribute).label === 'string' &&
  typeof (obj as PassEntryAttribute).value === 'string'

export const PassEntryValidator = {
  validate
}
