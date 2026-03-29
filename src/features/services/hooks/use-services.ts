import { useQuery } from '@tanstack/react-query'
import { ServiceId } from '@/features/services/lib/service.schema'
import { userServicesQueryOptions } from '../lib/user-services.queries'
import { useServicesUrl } from './use-services-url'

export function useService(serviceId: ServiceId) {
  const { url } = useServicesUrl()
  const { data: services = [] } = useQuery(userServicesQueryOptions(url))
  const service = services.find((service) => serviceId === service.id)
  return service
}
