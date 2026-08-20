import { queryOptions } from '@tanstack/react-query'
import { fetch } from 'expo/fetch'
import { getLocalServicesState } from '@/features/settings/lib/local-servies'
import { Version } from '@/lib/schemas'
import {
  AvailableDataLoaderId,
  AvailableDataLoaders,
  getDataLoader,
  hasDataLoader,
} from './data-loaders'
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
  options: {
    enabled: boolean
    isLocalService: boolean
    showPrereleases: boolean
  },
) =>
  userServiceQueryOptions(url, 'cup', {
    ...options,
    useCupToCheckForUpdates: false,
  })

type LoaderResult<T extends AvailableDataLoaderId> =
  {
    hasData: true
    healthy: boolean
    publicData: PublicData<T>
    updateData: UpdateCheck
  }

type NoLoaderResult = null | {
  /** The service has no loader, so it has no extra data besides the version */
  hasData: false
  publicData: { version: Version }
  updateData: UpdateCheck
}

type PublicData<T extends AvailableDataLoaderId> = Awaited<
  ReturnType<AvailableDataLoaders[T]['loadPublicData']>
>


export const userServiceQueryOptions = <T extends ServiceId = ServiceId>(
  url: string,
  id: T,
  options: {
    enabled: boolean
    isLocalService: boolean
    showPrereleases: boolean
    useCupToCheckForUpdates: boolean
  },
) => {
  let useCupToCheckForUpdates = options.useCupToCheckForUpdates
  const { enabled, isLocalService, showPrereleases } = options
  if (id === 'cup') {
    useCupToCheckForUpdates = false
  }

  return queryOptions({
    enabled,
    queryFn: async ({ client }) => {
      let services: Service[] | undefined
      if (isLocalService) {
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
          cupQueryOptions(url, {
            enabled: true,
            isLocalService,
            showPrereleases,
          }),
        )
        if (cupData?.hasData) {
          updateData = dataLoaderUtil.checkServiceUpdatesUsingCup(
            service,
            cupData.publicData.data,
          )
          cupFoundUpdates = updateData.hasUpdate
        }
      }

      if (!isBuiltInServiceId(id) || !hasDataLoader(id)) {
        if (updateData) {
          if (updateData.otherData?.version) {
            return {
              hasData: false,
              publicData: {
                version: updateData.otherData.version,
              },
              updateData,
            } satisfies NoLoaderResult
          }
          return {
            hasData: false,
            publicData: {
              version: {
                raw: 'No version available',
                type: 'unavailable',
              } satisfies Version,
            },
            updateData,
          } satisfies NoLoaderResult
        }
        return null satisfies NoLoaderResult
      }

      const loaders = getDataLoader(id)

      const healthy = await loaders.checkHealth(service.url)

      // Without the cast, the type would not be narrowed correctly
      // to the service's public data.
      const publicData = (await loaders.loadPublicData(
        service.url,
      )) as PublicData<typeof id>
      if (publicData.version.type !== 'semantic-version') {
        return {
          hasData: true,
          healthy,
          publicData,
          updateData,
        } satisfies LoaderResult<typeof id>
      }

      const loaderCanCheckForUpdate = 'checkForUpdates' in loaders

      // If cup was used and didn't find any updates, don't bother checking using the other methods
      // Those can still be used however to get more info (changelog, etc.)
      if (useCupToCheckForUpdates && !cupFoundUpdates) {
        return {
          hasData: true,
          healthy,
          publicData,
          updateData,
        } satisfies LoaderResult<typeof id>
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
              showPrereleases,
            )
            break
          }
          case 'github': {
            updateData = await dataLoaderUtil.checkGithubForUpdates(
              loaders.repo.name,
              publicData.version,
              showPrereleases,
            )
          }
        }
      }

      return {
        hasData: true,
        healthy,
        publicData,
        updateData,
      } satisfies LoaderResult<typeof id>
    },
    queryKey: [
      'services',
      url,
      'single',
      id,
      'info',
      isLocalService ? 'local' : 'remote',
      useCupToCheckForUpdates ? 'cup-update-check' : 'normal-update-check',
      showPrereleases ? 'with-prereleases' : 'without-prereleases',
    ],
  })
}
