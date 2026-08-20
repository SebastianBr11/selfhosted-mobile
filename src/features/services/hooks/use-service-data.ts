import { useQuery } from '@tanstack/react-query'
import { useSettings } from '@/features/settings/hooks/use-settings'
import { ServiceId } from '../lib/services.system'
import { userServiceQueryOptions } from '../lib/user-services.queries'
import { useServicesUrl } from './use-services-url'

export function useServiceData<T extends ServiceId>(serviceId: T) {
  const {
    fetchServiceData,
    showPrereleases,
    useCupToCheckForUpdates,
    useLocalSource,
  } = useSettings()

  const { url } = useServicesUrl()

  const query = useQuery(
    userServiceQueryOptions(url, serviceId, {
      enabled: fetchServiceData,
      isLocalService: useLocalSource,
      showPrereleases,
      useCupToCheckForUpdates,
    }),
  )

  if (fetchServiceData) {
    return {
      error: query.error,
      isLoading: query.isLoading,
      query,
      serviceData: query.data,
    }
  }

  return {
    error: null,
    isLoading: false,
    query,
    serviceData: undefined,
  }
}
