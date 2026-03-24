import * as v from 'valibot'
import { AssertExactlyAllIdsPresent } from '@/util/types'
import { builtInServices } from './builtin'
import { createUserInputSchema, Service } from './service.schema'

/**
 * Adding a new service is a three-step process:
 * 1. Add the service to the `builtInServicesIds` array
 * 2. Add the service in a new file to the `src/features/services/lib/builtin` directory
 * 3. Add the service to the {@link builtInServices} array
 */
const builtInServiceIds = [
  'adguard-home',
  'audiobookshelf',
  'authelia',
  'authentik',
  'bentopdf',
  'bookstack',
  'calibre-web',
  'changedetection',
  'cup',
  'dozzle',
  'firefly-iii',
  'forgejo',
  'freshrss',
  'gitea',
  'grafana',
  'grimmory',
  'home-assistant',
  'immich',
  'jellyfin',
  'linkace',
  'linkding',
  'linkwarden',
  'karakeep',
  'kavita',
  'mealie',
  'memos',
  'miniflux',
  'navidrome',
  'nextcloud',
  'ntfy',
  'olivetin',
  'otterwiki',
  'paperless',
  'papra',
  'pi-hole',
  'photoprism',
  'portainer',
  'readeck',
  'romm',
  'ryot',
  'seerr',
  'shelfmark',
  'stirling-pdf',
  'syncthing',
  'synology-calendar',
  'synology-contacts',
  'synology-dsm',
  'synology-drive',
  'synology-photos',
  'tandoor',
  'vaultwarden',
  'wakapi',
  'wallabag',
  'wanderer',
  'wikijs',
  'wg-easy',
  'yamtrack',
  'your-spotify',
] as const

export const serviceSystem = createServiceSystem(builtInServices)

type BuiltInServiceId = (typeof builtInServiceIds)[number]

function createServiceSystem<const T extends readonly Service[] = Service[]>(
  builtIns: AssertExactlyAllIdsPresent<T, BuiltInServiceId> & T,
) {
  // Map for fast lookups
  const defaultMap = new Map(builtIns.map((service) => [service.id, service]))

  const UserInputSchema = createUserInputSchema(new Set(defaultMap.keys()))

  return {
    builtIns,
    parse: (data: unknown) => {
      const { services } = v.parse(UserInputSchema, data)
      return services.map((item) => {
        const defaults = defaultMap.get(item.id)
        return {
          appStoreLink: item.appStoreLink ?? defaults?.appStoreLink,
          description: item.description ?? defaults?.description!,
          iconUrl: item.iconUrl ?? defaults?.iconUrl!,
          id: item.id,
          name: item.name ?? defaults?.name!,
          packageName: item.packageName ?? defaults?.packageName,
          url: item.url,
        } satisfies T[number]
      })
    },
    safeParse: (data: unknown) => {
      const parsed = v.safeParse(UserInputSchema, data)
      if (!parsed.success) return parsed
      return {
        ...parsed,
        output: parsed.output.services.map((item) => {
          const defaults = defaultMap.get(item.id)
          return {
            appStoreLink: item.appStoreLink ?? defaults?.appStoreLink,
            description: item.description ?? defaults?.description!,
            iconUrl: item.iconUrl ?? defaults?.iconUrl!,
            id: item.id,
            name: item.name ?? defaults?.name!,
            packageName: item.packageName ?? defaults?.packageName,
            url: item.url,
          } satisfies T[number]
        }),
      }
    },
    schema: UserInputSchema,
  }
}
