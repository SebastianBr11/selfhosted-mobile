import { Service } from '../service.schema'
import { serviceUrl } from './builtin-util'

export const navidrome = {
  description: 'Modern web-based music server',
  iconUrl:
    'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/navidrome.svg',
  id: 'navidrome',
  name: 'Navidrome',
  url: serviceUrl('https://www.navidrome.org'),
} as const satisfies Service
