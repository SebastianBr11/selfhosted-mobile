import { Service } from '../service.schema'
import { serviceUrl } from './builtin-util'

export const dozzle = {
  description: 'Simple Container Monitoring and Logging',
  iconUrl: 'https://dozzle.dev/logo.svg',
  id: 'dozzle',
  name: 'Dozzle',
  url: serviceUrl('https://dozzle.dev/'),
} as const satisfies Service
