import { Service } from '../service.schema'

export const authelia = {
  description: 'The Single Sign-On Multi-Factor portal for web apps',
  iconUrl:
    'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/authelia.svg',
  id: 'authelia',
  name: 'Authelia',
  url: 'https://www.authelia.com',
} as const satisfies Service
