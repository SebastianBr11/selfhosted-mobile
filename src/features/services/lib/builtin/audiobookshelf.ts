import { Service } from '../service.schema'
import { serviceUrl } from './builtin-util'

export const audiobookshelf = {
  appStoreLink:
    'https://play.google.com/store/apps/details?id=com.audiobookshelf.app',
  description: 'Self-hosted audiobook and podcast server',
  iconUrl: 'https://cdn.jsdelivr.net/gh/selfhst/icons/svg/audiobookshelf.svg',
  id: 'audiobookshelf',
  name: 'Audiobookshelf',
  packageName: 'com.audiobookshelf.app',
  url: serviceUrl('https://www.audiobookshelf.org/'),
} as const satisfies Service
