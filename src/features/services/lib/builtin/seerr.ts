import { Service } from '../service.schema'
import { serviceUrl } from '../services-util'

export const seerr = {
  description:
    'Open-source media request and discovery manager for Jellyfin, Plex, and Emby.',
  iconUrl:
    'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/seerr.svg',
  id: 'seerr',
  name: 'Seerr',
  packageName: 'dev.seerr.mobileapp',
  url: serviceUrl('https://docs.seerr.dev'),
} as const satisfies Service
