import { Service } from '../service.schema'
import { serviceUrl } from '../services-util'

export const cup = {
  description: 'Docker container updates made easy',
  iconUrl: 'https://cup.sergi0g.dev/favicon.svg',
  id: 'cup',
  name: 'Cup',
  url: serviceUrl('https://cup.sergi0g.dev/'),
} as const satisfies Service
