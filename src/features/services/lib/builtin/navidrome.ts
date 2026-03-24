import { Service } from '../service.schema'

export const navidrome = {
  description: 'Modern web-based music server',
  iconUrl:
    'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/navidrome.svg',
  id: 'navidrome',
  name: 'Navidrome',
  url: 'https://www.navidrome.org',
} as const satisfies Service
