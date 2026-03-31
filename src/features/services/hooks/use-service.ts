import { ServiceId } from '@/features/services/lib/service.schema'
import { useServices } from './use-services'

export function useService(serviceId: ServiceId) {
  const { services = [] } = useServices()
  const service = services.find((service) => serviceId === service.id)
  return service
}
