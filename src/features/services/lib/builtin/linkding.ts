import { Service } from '../service.schema'
import { serviceUrl } from './builtin-util'

export const linkding = {
  description:
    'A self-hosted bookmark manager designed to be minimal, fast, and easy to set up.',
  iconUrl: 'https://linkding.link/_astro/logo.DkvM5cgj.svg',
  id: 'linkding',
  name: 'linkding',
  url: serviceUrl('https://linkding.link/'),
} as const satisfies Service
