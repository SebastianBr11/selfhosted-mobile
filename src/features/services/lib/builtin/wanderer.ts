import { Service } from '../service.schema'
import { serviceUrl } from '../services-util'

export const wanderer = {
  description: 'A self-hosted trail database. Save your adventures!',
  iconUrl: {
    dark: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/wanderer-light.svg',
    light:
      'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/wanderer.svg',
  },
  id: 'wanderer',
  name: 'wanderer',
  url: serviceUrl('https://wanderer.to'),
} as const satisfies Service
