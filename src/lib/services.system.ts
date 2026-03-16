import { AssertExactlyAllIdsPresent } from '@/util/types'
import * as v from 'valibot'
import { createUserInputSchema, Service } from './service.schema'

const builtInServiceIds = [
  'audiobookshelf',
  'booklore',
  'cup',
  'dozzle',
  'freshrss',
  'jellyfin',
  'linkding',
  'ntfy',
  'otterwiki',
  'paperless',
  'pi-hole',
  'readeck',
  'romm',
  'tandoor',
  'vaultwarden',
  'yamtrack',
] as const

export const serviceSystem = createServiceSystem([
  {
    id: 'audiobookshelf',
    name: 'Audiobookshelf',
    url: 'https://www.audiobookshelf.org/',
    description: 'Self-hosted audiobook and podcast server',
    appStoreLink:
      'https://play.google.com/store/apps/details?id=com.audiobookshelf.app',
    packageName: 'com.audiobookshelf.app',
    iconUrl: 'https://www.audiobookshelf.org/Logo.png',
  },
  {
    id: 'booklore',
    name: 'Booklore',
    url: 'https://booklore.org/',
    description:
      'A modern way to organize, read, and own your digital library.',
    iconUrl: 'https://booklore.org/img/logo.svg',
  },
  {
    id: 'cup',
    name: 'Cup',
    url: 'https://cup.sergi0g.dev/',
    description: 'Docker container updates made easy',
    iconUrl: 'https://cup.sergi0g.dev/favicon.svg',
  },
  {
    id: 'dozzle',
    name: 'Dozzle',
    url: 'https://dozzle.dev/',
    description: 'Simple Container Monitoring and Logging',
    iconUrl: 'https://dozzle.dev/logo.svg',
  },
  {
    id: 'freshrss',
    name: 'FreshRSS',
    url: 'https://www.freshrss.org/',
    description: 'A free, self-hostable feed aggregator.',
    iconUrl: 'https://freshrss.org/images/icon.svg',
  },
  {
    id: 'jellyfin',
    name: 'Jellyfin',
    url: 'https://jellyfin.org/',
    description: 'The Free Software Media System',
    iconUrl:
      'https://raw.githubusercontent.com/jellyfin/jellyfin-ux/36fe7e93c830f53e5a5573745c15a43f5244f1e9/logos/SVG/jellyfin-icon--color-on-dark.svg',
  },
  {
    id: 'linkding',
    name: 'linkding',
    url: 'https://linkding.link/',
    description:
      'A self-hosted bookmark manager designed to be minimal, fast, and easy to set up.',
    iconUrl: 'https://linkding.link/_astro/logo.DkvM5cgj.svg',
  },
  {
    id: 'ntfy',
    name: 'ntfy',
    url: 'https://ntfy.sh/',
    description:
      'Send push notifications to your phone or desktop using PUT/POST',
    iconUrl:
      'https://github.com/binwiederhier/ntfy/raw/main/web/public/static/images/ntfy.png',
  },
  {
    id: 'otterwiki',
    name: 'An Otter Wiki',
    url: 'https://otterwiki.com/',
    description: 'A minimalistic wiki powered by python, markdown and git.',
    iconUrl: {
      light:
        'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/otter-wiki.svg',
      dark: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/otter-wiki-dark.svg',
    },
  },
  {
    id: 'paperless',
    name: 'Paperless-ngx',
    url: 'https://docs.paperless-ngx.com/',
    description:
      'A community-supported supercharged document management system: scan, index and archive all your documents',
    appStoreLink:
      'https://f-droid.org/en/packages/de.astubenbord.paperless_mobile/',
    iconUrl:
      'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/paperless-ngx.svg',
  },
  {
    id: 'pi-hole',
    name: 'Pi-hole',
    url: 'https://pi-hole.net/',
    description: 'A black hole for Internet advertisements',
    iconUrl:
      'https://wp-cdn.pi-hole.net/wp-content/uploads/2016/12/Vortex-R.png',
  },
  {
    id: 'readeck',
    name: 'Readeck',
    url: 'https://readeck.org/en/',
    description: 'Readeck is a libre, self hosted, read later web application.',
    iconUrl: 'https://readeck.org/media/favicons/favicon.d57024ea.svg',
  },
  {
    id: 'romm',
    name: 'Romm',
    url: 'https://romm.app/',
    description: 'A beautiful, powerful, self-hosted rom manager and player.',
    iconUrl: 'https://romm.app/_ipx/q_80/images/blocks/logos/romm.svg',
  },
  {
    id: 'tandoor',
    name: 'Tandoor Recipes',
    url: 'https://docs.tandoor.dev/',
    description:
      'The recipe manager that allows you to manage your ever growing collection of digital recipes.',
    iconUrl:
      'https://github.com/vabene1111/recipes/raw/develop/docs/logo_color.svg',
  },
  {
    id: 'vaultwarden',
    name: 'Vaultwarden',
    url: 'https://github.com/dani-garcia/vaultwarden',
    description: 'Unofficial Bitwarden compatible server written in Rust',
    iconUrl: {
      light:
        'https://github.com/dani-garcia/vaultwarden/raw/refs/heads/main/resources/vaultwarden-icon.svg',
      dark: 'https://github.com/dani-garcia/vaultwarden/raw/refs/heads/main/resources/vaultwarden-icon-white.svg',
    },
  },
  {
    id: 'yamtrack',
    name: 'Yamtrack',
    url: 'https://github.com/FuzzyGrim/Yamtrack',
    description:
      'A self hosted media tracker for movies, tv shows, anime, manga, video games, books, comics, and board games.',
    iconUrl: {
      light:
        'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/yamtrack-light.svg',
      dark: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/yamtrack.svg',
    },
  },
])

const BuiltInServiceIdSchema = v.picklist(builtInServiceIds)
type BuiltInServiceId = v.InferOutput<typeof BuiltInServiceIdSchema>

function createServiceSystem<const T extends readonly Service[] = Service[]>(
  builtIns: T & AssertExactlyAllIdsPresent<T, BuiltInServiceId>,
) {
  // Map for fast lookups
  const defaultMap = new Map(builtIns.map((service) => [service.id, service]))

  const UserInputSchema = createUserInputSchema(new Set(defaultMap.keys()))

  return {
    builtIns,
    parse: (data: unknown) => {
      const parsed = v.safeParse(v.array(UserInputSchema), data)
      if (!parsed.success) return parsed
      return {
        ...parsed,
        output: parsed.output.map((item) => {
          const defaults = defaultMap.get(item.id)
          return {
            id: item.id,
            name: item.name ?? defaults?.name!,
            url: item.url,
            description: item.description ?? defaults?.description!,
            appStoreLink: item.appStoreLink ?? defaults?.appStoreLink,
            packageName: item.packageName ?? defaults?.packageName,
            iconUrl: item.iconUrl ?? defaults?.iconUrl!,
          } satisfies T[number]
        }),
      }
    },
  }
}
