import * as v from 'valibot'
import { AssertExactlyAllIdsPresent } from '@/util/types'
import { createUserInputSchema, Service } from './service.schema'

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

export const serviceSystem = createServiceSystem([
  {
    description: 'Network-wide ads & trackers blocking DNS server',
    iconUrl:
      'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/adguard-home.svg',
    id: 'adguard-home',
    name: 'AdGuard Home',
    url: 'https://adguard.com/en/adguard-home/overview.html',
  },
  {
    appStoreLink:
      'https://play.google.com/store/apps/details?id=com.audiobookshelf.app',
    description: 'Self-hosted audiobook and podcast server',
    iconUrl: 'https://www.audiobookshelf.org/Logo.png',
    id: 'audiobookshelf',
    name: 'Audiobookshelf',
    packageName: 'com.audiobookshelf.app',
    url: 'https://www.audiobookshelf.org/',
  },
  {
    description: 'The Single Sign-On Multi-Factor portal for web apps',
    iconUrl:
      'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/authelia.svg',
    id: 'authelia',
    name: 'Authelia',
    url: 'https://www.authelia.com',
  },
  {
    description: 'The authentication glue you need.',
    iconUrl:
      'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/authentik.svg',
    id: 'authentik',
    name: 'Authentik',
    url: 'https://goauthentik.io',
  },
  {
    description: 'A Privacy First PDF Toolkit',
    iconUrl:
      'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/bentopdf.svg',
    id: 'bentopdf',
    name: 'BentoPDF',
    url: 'https://bentopdf.com',
  },
  {
    description:
      'A simple, self-hosted, easy-to-use platform for organising and storing information.',
    iconUrl:
      'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/bookstack.svg',
    id: 'bookstack',
    name: 'Bookstack',
    url: 'https://www.bookstackapp.com',
  },
  {
    description:
      'Web app for browsing, reading and downloading eBooks stored in a Calibre database',
    iconUrl:
      'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/calibre-web.svg',
    id: 'calibre-web',
    name: 'Calibre-Web',
    url: 'https://github.com/janeczku/calibre-web',
  },
  {
    description: 'Best and simplest tool for website change detection',
    iconUrl:
      'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/changedetection.svg',
    id: 'changedetection',
    name: 'Changedetection.io',
    url: 'https://changedetection.io',
  },
  {
    description: 'Docker container updates made easy',
    iconUrl: 'https://cup.sergi0g.dev/favicon.svg',
    id: 'cup',
    name: 'Cup',
    url: 'https://cup.sergi0g.dev/',
  },
  {
    description: 'Simple Container Monitoring and Logging',
    iconUrl: 'https://dozzle.dev/logo.svg',
    id: 'dozzle',
    name: 'Dozzle',
    url: 'https://dozzle.dev/',
  },
  {
    description: 'A free and open source personal finance manager',
    iconUrl:
      'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/firefly-iii.svg',
    id: 'firefly-iii',
    name: 'Firefly III',
    url: 'https://firefly-iii.org',
  },
  {
    description: 'A self-hosted lightweight software forge.',
    iconUrl:
      'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/forgejo.svg',
    id: 'forgejo',
    name: 'Forgejo',
    url: 'https://forgejo.org',
  },
  {
    description: 'A free, self-hostable feed aggregator.',
    iconUrl: 'https://freshrss.org/images/icon.svg',
    id: 'freshrss',
    name: 'FreshRSS',
    url: 'https://www.freshrss.org/',
  },
  {
    description: 'Painless self-hosted all-in-one software development service',
    iconUrl:
      'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/gitea.svg',
    id: 'gitea',
    name: 'Gitea',
    url: 'https://about.gitea.com/',
  },
  {
    description:
      'The open and composable observability and data visualization platform',
    iconUrl:
      'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/grafana.svg',
    id: 'grafana',
    name: 'Grafana',
    url: 'https://grafana.com',
  },
  {
    description:
      'Grimmory is the successor of booklore. A modern way to organize, read, and own your digital library.',
    iconUrl:
      'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/booklore.svg',
    id: 'grimmory',
    name: 'Grimmory',
    url: 'https://github.com/grimmory-tools/grimmory',
  },
  {
    appStoreLink:
      'https://play.google.com/store/apps/details?id=io.homeassistant.companion.android',
    description:
      'Open source home automation that puts local control and privacy first.',
    iconUrl:
      'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/home-assistant.svg',
    id: 'home-assistant',
    name: 'Home Assistant',
    packageName: 'io.homeassistant.companion.android',
    url: 'https://www.home-assistant.io',
  },
  {
    appStoreLink: 'https://get.immich.app/android',
    description: 'Self-hosted photo and video management solution',
    iconUrl:
      'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/immich.svg',
    id: 'immich',
    name: 'Immich',
    packageName: 'app.alextran.immich',
    url: 'https://immich.app/',
  },
  {
    appStoreLink:
      'https://play.google.com/store/apps/details?id=org.jellyfin.mobile',
    description: 'The Free Software Media System',
    iconUrl:
      'https://raw.githubusercontent.com/jellyfin/jellyfin-ux/36fe7e93c830f53e5a5573745c15a43f5244f1e9/logos/SVG/jellyfin-icon--color-on-dark.svg',
    id: 'jellyfin',
    name: 'Jellyfin',
    packageName: 'org.jellyfin.mobile',
    url: 'https://jellyfin.org/',
  },
  {
    description:
      'A self-hosted archive to collect links of your favorite websites.',
    iconUrl:
      'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/linkace.svg',
    id: 'linkace',
    name: 'LinkAce',
    url: 'https://www.linkace.org',
  },
  {
    description:
      'A self-hosted bookmark manager designed to be minimal, fast, and easy to set up.',
    iconUrl: 'https://linkding.link/_astro/logo.DkvM5cgj.svg',
    id: 'linkding',
    name: 'linkding',
    url: 'https://linkding.link/',
  },
  {
    appStoreLink:
      'https://play.google.com/store/apps/details?id=app.linkwarden',
    description:
      'Collect, read, annotate, and fully preserve what matters, all in one place.',
    iconUrl:
      'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/png/linkwarden.png',
    id: 'linkwarden',
    name: 'Linkwarden',
    packageName: 'app.linkwarden',
    url: 'https://linkwarden.app/website',
  },
  {
    appStoreLink:
      'https://play.google.com/store/apps/details?id=app.hoarder.hoardermobile',
    description:
      'A self-hostable bookmark-everything app with AI-based automatic tagging and full text search.',
    iconUrl: {
      dark: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/karakeep.svg',
      light:
        'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/karakeep-dark.svg',
    },
    id: 'karakeep',
    name: 'Karakeep',
    packageName: 'app.hoarder.hoardermobile',
    url: 'https://karakeep.app',
  },
  {
    description: 'A fast, feature rich, cross platform reading server. ',
    iconUrl:
      'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/kavita.svg',
    id: 'kavita',
    name: 'Kavita',
    url: 'https://www.kavitareader.com',
  },
  {
    description: 'A self hosted recipe manager and meal planner',
    iconUrl:
      'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/mealie.svg',
    id: 'mealie',
    name: 'Mealie',
    url: 'https://docs.mealie.io',
  },
  {
    description: 'A private timeline for your thoughts.',
    iconUrl:
      'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/memos.svg',
    id: 'memos',
    name: 'Memos',
    url: 'https://usememos.com',
  },
  {
    description: 'Minimalist and opinionated feed reader',
    iconUrl: {
      dark: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/miniflux-light.svg',
      light:
        'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/miniflux.svg',
    },
    id: 'miniflux',
    name: 'Miniflux',
    url: 'https://miniflux.app',
  },
  {
    description: 'Modern web-based music server',
    iconUrl:
      'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/navidrome.svg',
    id: 'navidrome',
    name: 'Navidrome',
    url: 'https://www.navidrome.org',
  },
  {
    appStoreLink:
      'https://play.google.com/store/apps/details?id=com.nextcloud.client',
    description: 'A safe home for all your data.',
    iconUrl:
      'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/nextcloud.svg',
    id: 'nextcloud',
    name: 'Nextcloud',
    packageName: 'com.nextcloud.client',
    url: 'https://nextcloud.com',
  },
  {
    appStoreLink:
      'https://play.google.com/store/apps/details?id=io.heckel.ntfy',
    description:
      'Send push notifications to your phone or desktop using PUT/POST',
    iconUrl:
      'https://github.com/binwiederhier/ntfy/raw/main/web/public/static/images/ntfy.png',
    id: 'ntfy',
    name: 'ntfy',
    packageName: 'io.heckel.ntfy',
    url: 'https://ntfy.sh/',
  },
  {
    description:
      'Give safe and simple access to predefined shell commands from a web interface.',
    iconUrl: {
      dark: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/olivetin-light.svg',
      light:
        'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/olivetin.svg',
    },
    id: 'olivetin',
    name: 'OliveTin',
    url: 'https://www.olivetin.app',
  },
  {
    description: 'A minimalistic wiki powered by python, markdown and git.',
    iconUrl: {
      dark: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/otter-wiki-dark.svg',
      light:
        'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/otter-wiki.svg',
    },
    id: 'otterwiki',
    name: 'An Otter Wiki',
    url: 'https://otterwiki.com/',
  },
  {
    appStoreLink:
      'https://f-droid.org/en/packages/de.astubenbord.paperless_mobile/',
    description:
      'A community-supported supercharged document management system: scan, index and archive all your documents',
    iconUrl:
      'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/paperless-ngx.svg',
    id: 'paperless',
    name: 'Paperless-ngx',
    url: 'https://docs.paperless-ngx.com/',
  },
  {
    description: 'The minimalistic document archiving platform.',
    iconUrl:
      'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/papra.svg',
    id: 'papra',
    name: 'Papra',
    url: 'https://github.com/papra-hq/papra',
  },
  {
    description: 'A black hole for Internet advertisements',
    iconUrl:
      'https://wp-cdn.pi-hole.net/wp-content/uploads/2016/12/Vortex-R.png',
    id: 'pi-hole',
    name: 'Pi-hole',
    url: 'https://pi-hole.net/',
  },
  {
    description: 'AI-Powered Photos App for the Decentralized Web 🌈💎✨',
    iconUrl: {
      dark: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/photoprism.svg',
      light:
        'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/photoprism-light.svg',
    },
    id: 'photoprism',
    name: 'PhotoPrism',
    url: 'https://www.photoprism.app',
  },
  {
    description: 'Making Docker and Kubernetes management easy.',
    iconUrl: {
      dark: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/portainer-dark.svg',
      light:
        'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/portainer.svg',
    },
    id: 'portainer',
    name: 'Portainer',
    url: 'https://www.portainer.io/',
  },
  {
    description: 'Readeck is a libre, self hosted, read later web application.',
    iconUrl: 'https://readeck.org/media/favicons/favicon.d57024ea.svg',
    id: 'readeck',
    name: 'Readeck',
    url: 'https://readeck.org/en/',
  },
  {
    description: 'A beautiful, powerful, self-hosted rom manager and player.',
    iconUrl: 'https://romm.app/_ipx/q_80/images/blocks/logos/romm.svg',
    id: 'romm',
    name: 'Romm',
    packageName: 'io.github.mattsays.rommmobile',
    url: 'https://romm.app/',
  },
  {
    description: 'Roll your own tracker!',
    iconUrl: {
      dark: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/ryot-light.svg',
      light:
        'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/ryot.svg',
    },
    id: 'ryot',
    name: 'Ryot',
    url: 'https://ryot.io',
  },
  {
    description:
      'Open-source media request and discovery manager for Jellyfin, Plex, and Emby.',
    iconUrl:
      'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/seerr.svg',
    id: 'seerr',
    name: 'Seerr',
    packageName: 'dev.seerr.mobileapp',
    url: 'https://docs.seerr.dev',
  },
  {
    description:
      'A self-hosted web interface for searching and downloading books and audiobooks from multiple sources.',
    iconUrl:
      'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/png/shelfmark.png',
    id: 'shelfmark',
    name: 'Shelfmark',
    url: 'https://github.com/calibrain/shelfmark',
  },
  {
    description:
      "The world's most secure PDF platform. AI-native and completely private.",
    iconUrl:
      'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/stirling-pdf.svg',
    id: 'stirling-pdf',
    name: 'Stirling PDF',
    url: 'https://www.stirling.com',
  },
  {
    appStoreLink:
      'https://f-droid.org/packages/com.github.catfriend1.syncthingfork',
    description: 'Open Source Continuous File Synchronization',
    iconUrl: {
      dark: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/syncthing-dark.svg',
      light:
        'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/syncthing.svg',
    },
    id: 'syncthing',
    name: 'Syncthing',
    packageName: 'com.github.catfriend1.syncthingfork',
    url: 'https://syncthing.net',
  },
  {
    description:
      'Centrally track events and tasks on a reliable, secure, and private platform.',
    iconUrl:
      'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/png/synology-calendar.png',
    id: 'synology-calendar',
    name: 'Synology Calendar',
    url: 'https://www.synology.com/en-global/dsm/feature/calendar',
  },
  {
    description:
      'Create, manage, sync, and share contacts with anyone from a single platform.',
    iconUrl:
      'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/png/synology-contacts.png',
    id: 'synology-contacts',
    name: 'Synology Contacts',
    url: 'https://www.synology.com/en-global/dsm/feature/contacts',
  },
  {
    description:
      'The intuitive operating system that powers every Synology NAS.',
    iconUrl:
      'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/synology-dsm.svg',
    id: 'synology-dsm',
    name: 'Synology DSM',
    url: 'https://www.synology.com/en-global/dsm',
  },
  {
    appStoreLink:
      'https://play.google.com/store/apps/details?id=com.synology.dsdrive',
    description:
      'Your unified solution for effortless file management and secure collaboration.',
    iconUrl:
      'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/png/synology-drive.png',
    id: 'synology-drive',
    name: 'Synology Drive',
    packageName: 'com.synology.dsdrive',
    url: 'https://www.synology.com/en-global/dsm/feature/drive',
  },
  {
    appStoreLink:
      'https://play.google.com/store/apps/details?id=com.synology.projectkailash',
    description:
      'Your all-in-one solution for organizing, sharing, and safeguarding your precious memories.',
    iconUrl:
      'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/png/synology-photos.png',
    id: 'synology-photos',
    name: 'Synology Photos',
    packageName: 'com.synology.projectkailash',
    url: 'https://www.synology.com/en-global/dsm/feature/photos',
  },
  {
    description:
      'The recipe manager that allows you to manage your ever growing collection of digital recipes.',
    iconUrl:
      'https://github.com/vabene1111/recipes/raw/develop/docs/logo_color.svg',
    id: 'tandoor',
    name: 'Tandoor Recipes',
    url: 'https://docs.tandoor.dev/',
  },
  {
    appStoreLink:
      'https://play.google.com/store/apps/details?id=com.x8bit.bitwarden',
    description: 'Unofficial Bitwarden compatible server written in Rust',
    iconUrl: {
      dark: 'https://github.com/dani-garcia/vaultwarden/raw/refs/heads/main/resources/vaultwarden-icon-white.svg',
      light:
        'https://github.com/dani-garcia/vaultwarden/raw/refs/heads/main/resources/vaultwarden-icon.svg',
    },
    id: 'vaultwarden',
    name: 'Vaultwarden',
    packageName: 'com.x8bit.bitwarden',
    url: 'https://github.com/dani-garcia/vaultwarden',
  },
  {
    description:
      'A minimalist, WakaTime-compatible backend for coding statistics',
    iconUrl:
      'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/wakapi.svg',
    id: 'wakapi',
    name: 'Wakapi',
    url: 'https://wakapi.dev',
  },
  {
    appStoreLink:
      'https://play.google.com/store/apps/details?id=fr.gaulupeau.apps.InThePoche',
    description: 'Save and classify articles. Read them later. Freely.',
    iconUrl: {
      dark: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/wallabag-light.svg',
      light:
        'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/wallabag.svg',
    },
    id: 'wallabag',
    name: 'Wallabag',
    packageName: 'fr.gaulupeau.apps.InThePoche',
    url: 'https://wallabag.org',
  },
  {
    description: 'A self-hosted trail database. Save your adventures!',
    iconUrl: {
      dark: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/wanderer-light.svg',
      light:
        'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/wanderer.svg',
    },
    id: 'wanderer',
    name: 'wanderer',
    url: 'https://wanderer.to',
  },
  {
    description: 'A modern and powerful wiki app built on Node.js',
    iconUrl:
      'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/wikijs.svg',
    id: 'wikijs',
    name: 'Wiki.js',
    url: 'https://js.wiki',
  },
  {
    description: 'The easiest way to run WireGuard VPN + Web-based Admin UI.',
    iconUrl:
      'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/wireguard.svg',
    id: 'wg-easy',
    name: 'wg-easy',
    url: 'https://wg-easy.github.io/wg-easy/latest/',
  },
  {
    description:
      'A self hosted media tracker for movies, tv shows, anime, manga, video games, books, comics, and board games.',
    iconUrl: {
      dark: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/yamtrack.svg',
      light:
        'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/yamtrack-light.svg',
    },
    id: 'yamtrack',
    name: 'Yamtrack',
    url: 'https://github.com/FuzzyGrim/Yamtrack',
  },
  {
    description: 'Self hosted Spotify tracking dashboard',
    iconUrl:
      'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/your-spotify.svg',
    id: 'your-spotify',
    name: 'Your Spotify',
    url: 'https://github.com/Yooooomi/your_spotify',
  },
])

const BuiltInServiceIdSchema = v.picklist(builtInServiceIds)
type BuiltInServiceId = v.InferOutput<typeof BuiltInServiceIdSchema>

function createServiceSystem<const T extends readonly Service[] = Service[]>(
  builtIns: AssertExactlyAllIdsPresent<T, BuiltInServiceId> & T,
) {
  // Map for fast lookups
  const defaultMap = new Map(builtIns.map((service) => [service.id, service]))

  const UserInputSchema = createUserInputSchema(new Set(defaultMap.keys()))

  return {
    builtIns,
    parse: (data: unknown) => {
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
