import { fetch } from 'expo/fetch'
import { serviceSystem } from './services.system'
import { Service } from './service.schema'

function signalTimeout(ms: number) {
  const ctrl = new AbortController()
  setTimeout(() => ctrl.abort(), ms)
  return ctrl.signal
}

type FetchUserServices =
  | {
      success: false
      errorType: 'fetch-failed'
      error: Error
    }
  | {
      success: false
      errorType: 'parse-failed'
      errors: string[]
    }
  | {
      success: true
      services: Service[]
    }

export async function fetchUserServices(
  url: string,
): Promise<FetchUserServices> {
  try {
    const data = await fetch(url, { signal: signalTimeout(10000) }).then(
      (res) => res.json(),
    )
    const parseResult = serviceSystem.parse(data)
    if (!parseResult.success) {
      return {
        success: false,
        errorType: 'parse-failed',
        errors: parseResult.issues.map((issue) => issue.message),
      }
    }
    return {
      success: true,
      services: parseResult.output,
    }
  } catch (error) {
    return {
      success: false,
      errorType: 'fetch-failed',
      error: error as Error,
    }
  }
}
