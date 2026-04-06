import { Service } from '../service.schema'
import { serviceUrl } from '../services-util'

export const changedetection = {
  description: 'Best and simplest tool for website change detection',
  iconUrl:
    'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/changedetection.svg',
  id: 'changedetection',
  name: 'Changedetection.io',
  url: serviceUrl('https://changedetection.io'),
} as const satisfies Service
