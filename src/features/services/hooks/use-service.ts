import { ServiceId } from '../lib/services.system'
import { useServices } from './use-services'

export function useService(serviceId: ServiceId) {
  const { services = [] } = useServices()
  const service = services.find((service) => serviceId === service.id)
  return service
}
