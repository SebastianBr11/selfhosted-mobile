import { Service } from '../service.schema'
import { serviceUrl } from '../services-util'

export const papra = {
  description: 'The minimalistic document archiving platform.',
  iconUrl:
    'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/papra.svg',
  id: 'papra',
  name: 'Papra',
  url: serviceUrl('https://github.com/papra-hq/papra'),
} as const satisfies Service
