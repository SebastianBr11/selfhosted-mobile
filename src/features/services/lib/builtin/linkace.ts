import { Service } from '../service.schema'
import { serviceUrl } from './builtin-util'

export const linkace = {
  description:
    'A self-hosted archive to collect links of your favorite websites.',
  iconUrl:
    'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/linkace.svg',
  id: 'linkace',
  name: 'LinkAce',
  url: serviceUrl('https://www.linkace.org'),
} as const satisfies Service
