import { Service } from '../service.schema'
import { serviceUrl } from './builtin-util'

export const olivetin = {
  description:
    'Give safe and simple access to predefined shell commands from a web interface.',
  iconUrl: {
    dark: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/olivetin-light.svg',
    light:
      'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/olivetin.svg',
  },
  id: 'olivetin',
  name: 'OliveTin',
  url: serviceUrl('https://www.olivetin.app'),
} as const satisfies Service
