import { AssertExactlyAllIdsPresent } from '@/util/types'
import * as v from 'valibot'
import { createUserInputSchema, Service } from './service.schema'

const builtInServiceIds = [
  'adguard-home',
  'audiobookshelf',
  'authelia',
  'authentik',
  'bookstack',
  'calibre-web',
  'changedetection',
  'cup',
  'dozzle',
  'firefly-iii',
  'freshrss',
  'gitea',
  'grafana',
  'grimmory',
  'home-assistant',
  'immich',
  'jellyfin',
  'linkding',
  'linkwarden',
  'karakeep',
  'memos',
  'navidrome',
  'nextcloud',
  'ntfy',
  'otterwiki',
  'paperless',
  'pi-hole',
  'photoprism',
  'portainer',
  'readeck',
  'romm',
  'stirling-pdf',
  'syncthing',
  'tandoor',
  'vaultwarden',
  'wallabag',
  'wikijs',
  'wg-easy',
  'yamtrack',
] as const

export const serviceSystem = createServiceSystem([
  {
    id: 'adguard-home',
    name: 'AdGuard Home',
    url: 'https://adguard.com/en/adguard-home/overview.html',
    description: 'Network-wide ads & trackers blocking DNS server',
    iconUrl:
      'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/adguard-home.svg',
  },
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
    id: 'authelia',
    name: 'Authelia',
    url: 'https://www.authelia.com',
    description: 'The Single Sign-On Multi-Factor portal for web apps',
    iconUrl:
      'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/authelia.svg',
  },
  {
    id: 'authentik',
    name: 'Authentik',
    url: 'https://goauthentik.io',
    description: 'The authentication glue you need.',
    iconUrl:
      'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/authentik.svg',
  },
  {
    id: 'bookstack',
    name: 'Bookstack',
    url: 'https://www.bookstackapp.com',
    description:
      'A simple, self-hosted, easy-to-use platform for organising and storing information.',
    iconUrl:
      'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/bookstack.svg',
  },
  {
    id: 'calibre-web',
    name: 'Calibre-Web',
    url: 'https://github.com/janeczku/calibre-web',
    description:
      'Web app for browsing, reading and downloading eBooks stored in a Calibre database',
    iconUrl:
      'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/calibre-web.svg',
  },
  {
    id: 'changedetection',
    name: 'Changedetection.io',
    url: 'https://changedetection.io',
    description: 'Best and simplest tool for website change detection',
    iconUrl:
      'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/changedetection.svg',
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
    id: 'firefly-iii',
    name: 'Firefly III',
    url: 'https://firefly-iii.org',
    description: 'A free and open source personal finance manager',
    iconUrl:
      'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/firefly-iii.svg',
  },
  {
    id: 'freshrss',
    name: 'FreshRSS',
    url: 'https://www.freshrss.org/',
    description: 'A free, self-hostable feed aggregator.',
    iconUrl: 'https://freshrss.org/images/icon.svg',
  },
  {
    id: 'gitea',
    name: 'Gitea',
    url: 'https://about.gitea.com/',
    description: 'Painless self-hosted all-in-one software development service',
    iconUrl:
      'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/gitea.svg',
  },
  {
    id: 'grafana',
    name: 'Grafana',
    url: 'https://grafana.com',
    description:
      'The open and composable observability and data visualization platform',
    iconUrl:
      'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/grafana.svg',
  },
  {
    id: 'grimmory',
    name: 'Grimmory',
    url: 'https://github.com/grimmory-tools/grimmory',
    description:
      'Grimmory is the successor of booklore. A modern way to organize, read, and own your digital library.',
    iconUrl:
      'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/booklore.svg',
  },
  {
    id: 'home-assistant',
    name: 'Home Assistant',
    url: 'https://www.home-assistant.io',
    appStoreLink:
      'https://play.google.com/store/apps/details?id=io.homeassistant.companion.android',
    packageName: 'io.homeassistant.companion.android',
    description:
      'Open source home automation that puts local control and privacy first.',
    iconUrl:
      'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/home-assistant.svg',
  },
  {
    id: 'immich',
    name: 'Immich',
    url: 'https://immich.app/',
    description: 'Self-hosted photo and video management solution',
    appStoreLink: 'https://get.immich.app/android',
    packageName: 'app.alextran.immich',
    iconUrl:
      'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/immich.svg',
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
    id: 'linkwarden',
    name: 'Linkwarden',
    url: 'https://linkwarden.app/website',
    description:
      'Collect, read, annotate, and fully preserve what matters, all in one place.',
    appStoreLink:
      'https://play.google.com/store/apps/details?id=app.linkwarden',
    packageName: 'app.linkwarden',
    iconUrl:
      'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/png/linkwarden.png',
  },
  {
    id: 'karakeep',
    name: 'Karakeep',
    url: 'https://karakeep.app',
    description:
      'A self-hostable bookmark-everything app with AI-based automatic tagging and full text search.',
    appStoreLink:
      'https://play.google.com/store/apps/details?id=app.hoarder.hoardermobile',
    packageName: 'app.hoarder.hoardermobile',
    iconUrl: {
      light:
        'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/karakeep-dark.svg',
      dark: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/karakeep.svg',
    },
  },
  {
    id: 'memos',
    name: 'Memos',
    url: 'https://usememos.com',
    description: 'A private timeline for your thoughts.',
    iconUrl:
      'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/memos.svg',
  },
  {
    id: 'navidrome',
    name: 'Navidrome',
    url: 'https://www.navidrome.org',
    description: 'Modern web-based music server',
    iconUrl:
      'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/navidrome.svg',
  },
  {
    id: 'nextcloud',
    name: 'Nextcloud',
    url: 'https://nextcloud.com',
    description: 'A safe home for all your data.',
    appStoreLink:
      'https://play.google.com/store/apps/details?id=com.nextcloud.client',
    packageName: 'com.nextcloud.client',
    iconUrl:
      'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/nextcloud.svg',
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
    id: 'photoprism',
    name: 'PhotoPrism',
    url: 'https://www.photoprism.app',
    description: 'AI-Powered Photos App for the Decentralized Web 🌈💎✨',
    iconUrl: {
      light:
        'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/photoprism-light.svg',
      dark: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/photoprism.svg',
    },
  },
  {
    id: 'portainer',
    name: 'Portainer',
    url: 'https://www.portainer.io/',
    description: 'Making Docker and Kubernetes management easy.',
    iconUrl: {
      light:
        'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/portainer.svg',
      dark: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/portainer-dark.svg',
    },
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
    id: 'stirling-pdf',
    name: 'Stirling PDF',
    url: 'https://www.stirling.com',
    description:
      "The world's most secure PDF platform. AI-native and completely private.",
    iconUrl:
      'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/stirling-pdf.svg',
  },
  {
    id: 'syncthing',
    name: 'Syncthing',
    url: 'https://syncthing.net',
    description: 'Open Source Continuous File Synchronization',
    appStoreLink:
      'https://f-droid.org/packages/com.github.catfriend1.syncthingfork',
    packageName: 'com.github.catfriend1.syncthingfork',
    iconUrl: {
      light:
        'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/syncthing.svg',
      dark: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/syncthing-dark.svg',
    },
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
    id: 'wallabag',
    name: 'Wallabag',
    url: 'https://wallabag.org',
    description: 'Save and classify articles. Read them later. Freely.',
    appStoreLink:
      'https://play.google.com/store/apps/details?id=fr.gaulupeau.apps.InThePoche',
    packageName: 'fr.gaulupeau.apps.InThePoche',
    iconUrl: {
      light:
        'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/wallabag.svg',
      dark: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/wallabag-light.svg',
    },
  },
  {
    id: 'wikijs',
    name: 'Wiki.js',
    url: 'https://js.wiki',
    description: 'A modern and powerful wiki app built on Node.js',
    iconUrl:
      'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/wikijs.svg',
  },
  {
    id: 'wg-easy',
    name: 'wg-easy',
    url: 'https://wg-easy.github.io/wg-easy/latest/',
    description: 'The easiest way to run WireGuard VPN + Web-based Admin UI.',
    iconUrl:
      'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/wireguard.svg',
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
