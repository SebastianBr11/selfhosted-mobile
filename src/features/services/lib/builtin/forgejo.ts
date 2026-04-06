import { Service } from '../service.schema'
import { serviceUrl } from './builtin-util'

export const forgejo = {
  description: 'A self-hosted lightweight software forge.',
  iconUrl:
    'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/forgejo.svg',
  id: 'forgejo',
  name: 'Forgejo',
  url: serviceUrl('https://forgejo.org'),
} as const satisfies Service
