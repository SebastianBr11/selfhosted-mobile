import { useState } from 'react'
import { createStore } from 'stan-js'
import { storage } from 'stan-js/storage'
import { Service, ServiceId } from '@/lib/service.schema'
import { fetchUserServices } from '@/lib/user-services.service'

const { useStore } = createStore({
  services: storage<Service[]>([]),
})

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

export function useService(serviceId: ServiceId) {
  const { services } = useStore()
  const service = services.find((service) => serviceId === service.id)
  return service
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
          didFetch: true,
          errors: result.errors,
          fetching: false,
          success: false,
        })
        return
      } else if (result.errorType === 'fetch-failed') {
        setFetchState({
          didFetch: true,
          errors: [result.error.message],
          fetching: false,
          success: false,
        })
        return
      }
      setFetchState({
        didFetch: true,
        errors: ['Unknown error ocurred.'],
        fetching: false,
        success: false,
      })
      return
    }
    setFetchState({ didFetch: true, fetching: false, success: true })
    setServices(result.services)
  }

  return {
    fetchServices,
    fetchState,
    services,
  }
}
