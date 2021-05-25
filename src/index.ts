import raceAbort, { AbortError } from 'race-abort';
import timeout from 'timeout-then'

export { AbortError } from 'race-abort';

export default async function abortableTimeout(duration: number, signal: AbortSignal): Promise<void> {
  const timer = timeout(duration)
  try {
    await raceAbort(signal, timer)
  } catch(err) {
    if (err instanceof AbortError) timer.clear()
    throw err
  }
}
