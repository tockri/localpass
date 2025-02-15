type SuccessResult<T> = Readonly<{
  success: true
  value: T
}>
type FailureResult = Readonly<{
  success: false
  error: string
}>
export type Result<T> = SuccessResult<T> | FailureResult
export type AsyncResult<T> = Promise<Result<T>>

export function isSuccess<T>(obj: unknown): obj is SuccessResult<T> {
  return (
    obj !== null &&
    typeof obj === 'object' &&
    (obj as SuccessResult<T>).success === true &&
    'value' in obj
  )
}

export function isFailure(obj: unknown): obj is FailureResult {
  return (
    obj !== null &&
    typeof obj === 'object' &&
    (obj as FailureResult).success === false &&
    typeof (obj as FailureResult).error === 'string'
  )
}

export function isResult<T>(obj: unknown): obj is Result<T> {
  return isSuccess(obj) || isFailure(obj)
}

export type ResultifyFuncReturn<T> = T | Result<T> | Promise<Result<T>> | Promise<T>

export function resultify<T>(func: () => T): Result<T> {
  try {
    return success(func())
  } catch (error) {
    console.warn({ error })
    if (error instanceof Error) {
      return fail(error.message)
    } else {
      return fail(`Unknown error ${error}`)
    }
  }
}

export async function resultifyAsync<T>(func: () => ResultifyFuncReturn<T>): AsyncResult<T> {
  try {
    const result = await func()
    if (isResult<T>(result)) {
      return result
    }
    return success(result)
  } catch (error) {
    //console.warn({ error })
    if (error instanceof Error) {
      return fail(error.message)
    } else {
      return fail(`Unknown error ${error}`)
    }
  }
}

export function success<T>(value: T): SuccessResult<T> {
  return { success: true, value: value as T }
}

export function fail(error: string): FailureResult {
  return { success: false, error }
}
