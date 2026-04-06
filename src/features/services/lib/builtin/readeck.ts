import { Service } from '../service.schema'
import { serviceUrl } from './builtin-util'

export const readeck = {
  description: 'Readeck is a libre, self hosted, read later web application.',
  iconUrl: 'https://readeck.org/media/favicons/favicon.d57024ea.svg',
  id: 'readeck',
  name: 'Readeck',
  url: serviceUrl('https://readeck.org/en/'),
} as const satisfies Service
