import { toRaw } from 'vue'
export const deepToRaw = <T>(value: T): T => {
  if (!value || typeof value !== 'object') {
    return value
  } else if (Array.isArray(value)) {
    return value.map(deepToRaw) as unknown as T
  } else {
    const raw = toRaw(value)
    for (const key in raw) {
      raw[key] = deepToRaw(raw[key])
    }
    return raw
  }
}
