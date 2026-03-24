import { Service } from '../service.schema'

export const dozzle = {
  description: 'Simple Container Monitoring and Logging',
  iconUrl: 'https://dozzle.dev/logo.svg',
  id: 'dozzle',
  name: 'Dozzle',
  url: 'https://dozzle.dev/',
} as const satisfies Service
