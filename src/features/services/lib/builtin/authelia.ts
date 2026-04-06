import { Service } from '../service.schema'
import { serviceUrl } from './builtin-util'

export const authelia = {
  description: 'The Single Sign-On Multi-Factor portal for web apps',
  iconUrl:
    'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/authelia.svg',
  id: 'authelia',
  name: 'Authelia',
  url: serviceUrl('https://www.authelia.com'),
} as const satisfies Service
