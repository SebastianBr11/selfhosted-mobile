import { Service } from '../service.schema'
import { serviceUrl } from './builtin-util'

export const wikijs = {
  description: 'A modern and powerful wiki app built on Node.js',
  iconUrl:
    'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/wikijs.svg',
  id: 'wikijs',
  name: 'Wiki.js',
  url: serviceUrl('https://js.wiki'),
} as const satisfies Service
