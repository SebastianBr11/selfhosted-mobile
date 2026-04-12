import { Service } from '../service.schema'
import { serviceUrl } from './builtin-util'

export const wakapi = {
  description:
    'A minimalist, WakaTime-compatible backend for coding statistics',
  iconUrl:
    'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/wakapi.svg',
  id: 'wakapi',
  name: 'Wakapi',
  url: serviceUrl('https://wakapi.dev'),
} as const satisfies Service
