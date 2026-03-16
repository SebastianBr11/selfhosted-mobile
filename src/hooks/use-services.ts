import { createStore } from 'stan-js'
import { storage } from 'stan-js/storage'
import { fetchUserServices } from '@/lib/user-services.service'
import { useState } from 'react'
import { Service, ServiceId } from '@/lib/service.schema'

const { useStore } = createStore({
  services: storage<Service[]>([]),
})

type FetchState =
  | { didFetch: false }
  | {
      didFetch: true
      fetching: true
    }
  | {
      didFetch: true

      fetching: false
      success: true
    }
  | {
      didFetch: true
      fetching: false
      success: false
      errors: string[]
    }

export function useServices(url: string) {
  const { services, setServices } = useStore()
  const [fetchState, setFetchState] = useState<FetchState>({ didFetch: false })

  async function fetchServices() {
    if (fetchState.didFetch && fetchState.fetching) return

    setFetchState({ didFetch: true, fetching: true })
    const result = await fetchUserServices(url)
    if (!result.success) {
      if (result.errorType === 'parse-failed') {
        setFetchState({
          success: false,
          didFetch: true,
          errors: result.errors,
          fetching: false,
        })
        return
      } else if (result.errorType === 'fetch-failed') {
        setFetchState({
          success: false,
          didFetch: true,
          errors: [result.error.message],
          fetching: false,
        })
        return
      }
      setFetchState({
        success: false,
        didFetch: true,
        errors: ['Unknown error ocurred.'],
        fetching: false,
      })
      return
    }
    setFetchState({ success: true, didFetch: true, fetching: false })
    setServices(result.services)
  }

  return {
    services,
    fetchState,
    fetchServices,
  }
}

export function useService(serviceId: ServiceId) {
  const { services } = useStore()
  const service = services.find((service) => serviceId === service.id)
  return service
}
