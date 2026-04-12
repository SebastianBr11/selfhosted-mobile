import { Service } from '../service.schema'
import { serviceUrl } from './builtin-util'

export const photoprism = {
  description: 'AI-Powered Photos App for the Decentralized Web 🌈💎✨',
  iconUrl: {
    dark: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/photoprism.svg',
    light:
      'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/photoprism-light.svg',
  },
  id: 'photoprism',
  name: 'PhotoPrism',
  url: serviceUrl('https://www.photoprism.app'),
} as const satisfies Service
