import { Service } from '../service.schema'
import { serviceUrl } from '../services-util'

export const miniflux = {
  description: 'Minimalist and opinionated feed reader',
  iconUrl: {
    dark: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/miniflux-light.svg',
    light:
      'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/miniflux.svg',
  },
  id: 'miniflux',
  name: 'Miniflux',
  url: serviceUrl('https://miniflux.app'),
} as const satisfies Service
