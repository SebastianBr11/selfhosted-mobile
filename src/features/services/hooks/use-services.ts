import { useQuery } from '@tanstack/react-query'
import { ServiceId } from '@/features/services/lib/service.schema'
import { userServicesQueryKey } from '../lib/user-services.queries'
import { useServicesUrl } from './use-services-url'

export function useService(serviceId: ServiceId) {
  const { url } = useServicesUrl()
  const { data: services = [] } = useQuery(userServicesQueryKey(url))
  const service = services.find((service) => serviceId === service.id)
  return service
}
