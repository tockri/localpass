import { AsyncResult, resultifyAsync, ResultifyFuncReturn } from '@common/interface/Result'

export class MockUtil {
  constructor(
    private readonly serviceName: string,
    private readonly waitMs: number
  ) {}

  wait(ms?: number): Promise<void> {
    const waitMs = ms !== undefined ? ms : this.waitMs
    if (waitMs > 0) {
      return new Promise((resolve) => setTimeout(resolve, waitMs))
    }
    return Promise.resolve()
  }

  async prepend(method: string, obj?: unknown): Promise<void> {
    await this.wait()
    this.log(method, obj)
  }

  log(message: string, obj?: unknown): void {
    const messagePart = message ? `: ${message}` : ''
    const objectPart = obj ? `\n${JSON.stringify(obj, null, 2)}` : ''
    console.log(`[Mock] ${this.serviceName}${messagePart}${objectPart}`)
  }

  async wrap<T>(method: string, func: () => ResultifyFuncReturn<T>, obj?: unknown): AsyncResult<T> {
    await this.prepend(method, obj)
    return resultifyAsync(func)
  }

  resultifyAsync<T>(result: ResultifyFuncReturn<T>): AsyncResult<T> {
    return resultifyAsync(() => result)
  }
}
