import { Service } from '../service.schema'
import { serviceUrl } from './builtin-util'

export const freshrss = {
  description: 'A free, self-hostable feed aggregator.',
  iconUrl: 'https://freshrss.org/images/icon.svg',
  id: 'freshrss',
  name: 'FreshRSS',
  url: serviceUrl('https://www.freshrss.org/'),
} as const satisfies Service
