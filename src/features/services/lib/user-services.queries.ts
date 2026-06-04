import { queryOptions } from '@tanstack/react-query'
import { fetch } from 'expo/fetch'
import { getLocalServicesState } from '@/features/settings/lib/local-servies'
import { Version } from '@/lib/schemas'
import { getDataLoader, hasDataLoader } from './data-loaders'
import { CupData } from './data-loaders/cup'
import { dataLoaderUtil } from './data-loaders/data-loader-util'
import { UpdateCheck } from './data-loaders/types'
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

const cupQueryOptions = (
  url: string,
  localService: boolean,
  enabled: boolean,
) => userServiceQueryOptions(url, 'cup', localService, enabled, false)

export const userServiceQueryOptions = <T extends ServiceId = ServiceId>(
  url: string,
  id: T,
  localService: boolean,
  enabled: boolean,
  useCupToCheckForUpdates: boolean,
) => {
  if (id === 'cup') {
    useCupToCheckForUpdates = false
  }
  return queryOptions({
    enabled,
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

      let updateData: UpdateCheck = { hasUpdate: false }
      let cupFoundUpdates = false

      if (useCupToCheckForUpdates) {
        const cupData = await client.fetchQuery(
          cupQueryOptions(url, localService, true),
        )
        if (cupData.publicData?.data) {
          updateData = dataLoaderUtil.checkServiceUpdatesUsingCup(
            service,
            cupData.publicData.data as CupData,
          )
          cupFoundUpdates = updateData.hasUpdate
        }
      }

      if (!isBuiltInServiceId(id) || !hasDataLoader(id)) {
        if (updateData) {
          if (updateData.otherData?.version) {
            return {
              publicData: {
                data: {},
                version: updateData.otherData.version,
              },
              updateData,
            }
          }
          return {
            publicData: {
              data: {},
              version: {
                raw: 'No version available',
                type: 'unavailable',
              } satisfies Version,
            },
            updateData,
          }
        }
        return { notAvailable: true }
      }

      const loaders = getDataLoader(id)

      const healthy = await loaders.checkHealth(service.url)
      const publicData = await loaders.loadPublicData(service.url)
      if (publicData.version.type !== 'semantic-version') {
        return { healthy, publicData, serviceId: loaders.serviceId }
      }

      const loaderCanCheckForUpdate = 'checkForUpdates' in loaders

      // If cup was used and didn't find any updates, don't bother checking using the other methods
      // Those can still be used however to get more info (changelog, etc.)
      if (useCupToCheckForUpdates && !cupFoundUpdates) {
        return {
          healthy,
          publicData,
          serviceId: loaders.serviceId,
          updateData,
        }
      }

      if (loaderCanCheckForUpdate) {
        updateData = await loaders.checkForUpdates(
          service.url,
          publicData.version,
        )
      } else if (loaders.repo) {
        switch (loaders.repo.vcs) {
          case 'codeberg': {
            updateData = await dataLoaderUtil.checkCodebergForUpdates(
              loaders.repo.name,
              publicData.version,
            )
            break
          }
          case 'github': {
            updateData = await dataLoaderUtil.checkGithubForUpdates(
              loaders.repo.name,
              publicData.version,
            )
          }
        }
      }

      return {
        healthy,
        publicData,
        serviceId: loaders.serviceId,
        updateData,
      }
    },
    queryKey: [
      'services',
      url,
      'single',
      id,
      'info',
      localService ? 'local' : 'remote',
      useCupToCheckForUpdates ? 'cup-update-check' : 'normal-update-check',
    ],
  })
}
