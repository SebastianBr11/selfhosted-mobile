import { createStore } from 'stan-js'
import { storage } from 'stan-js/storage'
import { builtInServices } from '@/features/services/lib/builtin'
import { Service, ServiceId } from '@/features/services/lib/service.schema'

export const { useStore: useLocalServices } = createStore(
  {
    services: storage<Service[]>([], { storageKey: 'local-services' }),
    get servicesIdsSet() {
      return new Set(this.services.map((service: Service) => service.id))
    },
  },
  ({ actions }) => ({
    addServiceById(serviceId: ServiceId) {
      console.log('adding service', serviceId)
      const builtInService = builtInServices.find(
        (service) => service.id === serviceId,
      )
      if (!builtInService) {
        console.warn(
          `Trying to add service, but service with id ${serviceId} is not a built-in service.`,
        )
        return
      }
      actions.setServices((prevServices) => [...prevServices, builtInService])
    },
    removeServiceById(serviceId: ServiceId) {
      actions.setServices((prevServices) =>
        prevServices.filter((service) => service.id !== serviceId),
      )
    },
  }),
)

export const useLocalService = (serviceId: string) => {
  const { services } = useLocalServices()
  return services.find((service) => service.id === serviceId)
}
