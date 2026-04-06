import { Service } from '../service.schema'
import { serviceUrl } from '../services-util'

export const ryot = {
  description: 'Roll your own tracker!',
  iconUrl: {
    dark: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/ryot-light.svg',
    light:
      'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/ryot.svg',
  },
  id: 'ryot',
  name: 'Ryot',
  url: serviceUrl('https://ryot.io'),
} as const satisfies Service
