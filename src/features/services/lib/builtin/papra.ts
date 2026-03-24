import { Service } from '../service.schema'

export const papra = {
  description: 'The minimalistic document archiving platform.',
  iconUrl:
    'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/papra.svg',
  id: 'papra',
  name: 'Papra',
  url: 'https://github.com/papra-hq/papra',
} as const satisfies Service
