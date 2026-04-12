import { createStore } from 'stan-js'
import { storage } from 'stan-js/storage'
import { builtInServices } from '@/features/services/lib/builtin'
import { Service } from '@/features/services/lib/service.schema'
import { ServiceId } from '@/features/services/lib/services.system'

export const {
  actions: { setServices: setLocalServices },
  getState: getLocalServicesState,
  useStore: useLocalServices,
} = createStore(
  {
    services: storage<Service[]>([], { storageKey: 'local-services' }),
    get servicesIdsSet() {
      return new Set(this.services.map((service: Service) => service.id))
    },
  },
  ({ actions }) => ({
    addServiceById(
      serviceId: ServiceId,
      fieldsToUpdate?: Partial<Omit<Service, 'id'>>,
    ) {
      const builtInService = builtInServices.find(
        (service) => service.id === serviceId,
      )
      if (!builtInService) {
        console.warn(
          `Trying to add service, but service with id ${serviceId} is not a built-in service.`,
        )
        return
      }
      if (fieldsToUpdate) {
        actions.setServices((prevServices) => [
          ...prevServices,
          { ...builtInService, ...fieldsToUpdate },
        ])
      } else {
        actions.setServices((prevServices) => [...prevServices, builtInService])
      }
    },
    removeServiceById(serviceId: ServiceId) {
      actions.setServices((prevServices) =>
        prevServices.filter((service) => service.id !== serviceId),
      )
    },
    resetService(serviceId: ServiceId) {
      const builtInService = builtInServices.find(
        (service) => service.id === serviceId,
      )
      if (!builtInService) {
        console.warn(
          `Trying to reset service, but service with id ${serviceId} is not a built-in service.`,
        )
        return
      }
      actions.setServices((prevServices) =>
        prevServices.map((prevService) => {
          if (prevService.id === serviceId) {
            return builtInService
          }
          return prevService
        }),
      )
    },
    updateService(service: Partial<Service>) {
      actions.setServices((prevServices) =>
        prevServices.map((prevService) => {
          if (prevService.id === service.id) {
            return {
              ...prevService,
              ...service,
            }
          }
          return prevService
        }),
      )
    },
  }),
)

export const useLocalService = (serviceId: string) => {
  const { resetService, services, updateService } = useLocalServices()
  const service = services.find((service) => service.id === serviceId)
  return {
    resetService: () => resetService(serviceId),
    service,
    updateService: (service: Partial<Service>) =>
      updateService({ ...service, id: serviceId }),
  }
}
