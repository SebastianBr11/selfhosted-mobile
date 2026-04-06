import { queryOptions } from '@tanstack/react-query'
import { fetch } from 'expo/fetch'
import { getLocalServicesState } from '@/features/settings/lib/local-servies'
import { getDataLoader } from './data-loaders'
import { Service } from './service.schema'
import { isBuiltInServiceId } from './services-util'
import { ServiceId, serviceSystem } from './services.system'

export const remoteServicesQueryOptions = (url: string) => {
  return queryOptions({
    enabled: false,
    queryFn: async ({ signal }) => {
      const data = await fetch(url, { signal })
      return serviceSystem.parse(await data.json())
    },
    queryKey: ['services', url],
    retry: false,
  })
}

export const userServiceQueryOptions = <T extends ServiceId = ServiceId>(
  url: string,
  id: T,
  localService: boolean,
) => {
  return queryOptions({
    queryFn: async ({ client }) => {
      let services: Service[] | undefined
      if (localService) {
        services = getLocalServicesState().services
      } else {
        services = client.getQueryData(remoteServicesQueryOptions(url).queryKey)
      }
      const service = services?.find((service) => service.id === id)
      if (!service) {
        throw new Error(`Service "${id}" not found`)
      }

      if (isBuiltInServiceId(service.id)) {
        const loaders = getDataLoader(service.id)
        if (!loaders) {
          return null
        }

        const publicData = await loaders.loadPublicData(service.url)

        return { publicData }
      }
      return null
    },
    queryKey: [
      'services',
      url,
      'single',
      id,
      'info',
      localService ? 'local' : 'remote',
    ],
  })
}
