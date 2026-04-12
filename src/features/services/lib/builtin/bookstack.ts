import { Service } from '../service.schema'
import { serviceUrl } from './builtin-util'

export const bookstack = {
  description:
    'A simple, self-hosted, easy-to-use platform for organising and storing information.',
  iconUrl:
    'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/bookstack.svg',
  id: 'bookstack',
  name: 'Bookstack',
  url: serviceUrl('https://www.bookstackapp.com'),
} as const satisfies Service
