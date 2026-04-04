import { useQuery } from '@tanstack/react-query'
import { useSettings } from '@/features/settings/hooks/use-settings'
import { useLocalServices } from '@/features/settings/lib/local-servies'
import { remoteServicesQueryOptions } from '../lib/user-services.queries'
import { useServicesUrl } from './use-services-url'

export function useServices() {
  const { useRemoteSource } = useSettings()
  const { services: localServices } = useLocalServices()
  const { url: servicesUrl, valid: isServicesUrlValid } = useServicesUrl()
  const {
    data: remoteServices,
    fetchStatus,
    isFetching,
    refetch,
  } = useQuery(remoteServicesQueryOptions(servicesUrl))

  if (!isServicesUrlValid && useRemoteSource) {
    return {
      remote: true,
      services: [],
    }
  }

  if (useRemoteSource) {
    return {
      fetchStatus,
      isFetching,
      refetch,
      remote: true,
      services: remoteServices ?? [],
    }
  }
  return {
    remote: false,
    services: localServices,
  }
}
