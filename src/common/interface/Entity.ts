export type Entity = {
  readonly id: string
}

export type EntityInput<T extends Entity> = Omit<T, 'id'>
