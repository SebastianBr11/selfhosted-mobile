import { createStore } from 'stan-js'
import { storage } from 'stan-js/storage'
import { Service, ServiceId } from '@/features/services/lib/service.schema'
import { fetchUserServices } from '@/features/services/lib/user-services.service'

type FetchState =
  | { didFetch: false }
  | {
      didFetch: true
      errors: string[]
      fetching: false
      success: false
    }
  | {
      didFetch: true

      fetching: false
      success: true
    }
  | {
      didFetch: true
      fetching: true
    }

const { useStore } = createStore({
  fetchState: { didFetch: false } satisfies FetchState as FetchState,
  services: storage<Service[]>([]),
})

export function useService(serviceId: ServiceId) {
  const { services } = useStore()
  const service = services.find((service) => serviceId === service.id)
  return service
}

export function useServices(url: string) {
  const { fetchState, services, setFetchState, setServices } = useStore()

  async function fetchServices(): Promise<FetchState> {
    if (fetchState.didFetch && fetchState.fetching) return fetchState

    setFetchState({ didFetch: true, fetching: true })
    const result = await fetchUserServices(url)

    let newFetchState: FetchState
    if (result.success) {
      setServices(result.services)
      newFetchState = {
        didFetch: true,
        fetching: false,
        success: true,
      }
      setFetchState(newFetchState)
      return newFetchState
    }

    if (result.errorType === 'parse-failed') {
      newFetchState = {
        didFetch: true,
        errors: result.errors,
        fetching: false,
        success: false,
      }
    } else if (result.errorType === 'fetch-failed') {
      newFetchState = {
        didFetch: true,
        errors: [result.error.message],
        fetching: false,
        success: false,
      }
    } else {
      newFetchState = {
        didFetch: true,
        errors: ['Unknown error ocurred.'],
        fetching: false,
        success: false,
      }
    }
    setFetchState(newFetchState)
    return fetchState
  }

  return {
    fetchServices,
    fetchState,
    services,
  }
}
