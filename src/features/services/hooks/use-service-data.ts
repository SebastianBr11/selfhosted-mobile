import { useQuery } from '@tanstack/react-query'
import { useSettings } from '@/features/settings/hooks/use-settings'
import { ServiceId } from '../lib/services.system'
import { userServiceQueryOptions } from '../lib/user-services.queries'
import { useServicesUrl } from './use-services-url'

export function useServiceData(serviceId: ServiceId) {
  const { fetchServiceData, useCupToCheckForUpdates, useLocalSource } =
    useSettings()

  const { url } = useServicesUrl()

  return useQuery(
    userServiceQueryOptions(
      url,
      serviceId,
      useLocalSource,
      fetchServiceData,
      useCupToCheckForUpdates,
    ),
  )
}
