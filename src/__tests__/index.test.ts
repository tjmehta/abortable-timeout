import AbortController from 'fast-abort-controller'
import timeout from '../index'

jest.useFakeTimers()

describe('abortable-timeout', () => {
  it('should resolve after timeout', async () => {
    const signal = new AbortController().signal
    const duration = 1000
    const promise = timeout(duration, signal)
    await runTimersToTime(duration)
    await promise
  })

  it('should abort timeout via signal', async () => {
    const controller = new AbortController()
    const signal = controller.signal
    const duration = 1000
    const promise = timeout(duration, signal)
    controller.abort()
    await expect(promise).rejects.toThrowErrorMatchingInlineSnapshot(
      `"aborted"`,
    )
  })

  it('should abort timeout via signal (immediately)', async () => {
    const controller = new AbortController()
    const signal = controller.signal
    const duration = 1000
    controller.abort()
    const promise = timeout(duration, signal)
    await expect(promise).rejects.toThrowErrorMatchingInlineSnapshot(
      `"aborted"`,
    )
  })
})

async function runTimersToTime(duration: number) {
  jest.runTimersToTime(duration)
  await Promise.resolve()
}
