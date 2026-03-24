import { fetch } from 'expo/fetch'
import { Service } from './service.schema'
import { serviceSystem } from './services.system'

type FetchUserServices =
  | {
      error: Error
      errorType: 'fetch-failed'
      success: false
    }
  | {
      errors: string[]
      errorType: 'parse-failed'
      success: false
    }
  | {
      services: Service[]
      success: true
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
        errors: parseResult.issues.map((issue) => issue.message),
        errorType: 'parse-failed',
        success: false,
      }
    }
    return {
      services: parseResult.output,
      success: true,
    }
  } catch (error) {
    return {
      error: error as Error,
      errorType: 'fetch-failed',
      success: false,
    }
  }
}

function signalTimeout(ms: number) {
  const ctrl = new AbortController()
  setTimeout(() => ctrl.abort(), ms)
  return ctrl.signal
}
