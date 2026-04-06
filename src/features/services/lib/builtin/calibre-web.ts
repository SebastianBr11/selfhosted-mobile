import { Service } from '../service.schema'
import { serviceUrl } from '../services-util'

export const calibreWeb = {
  description:
    'Web app for browsing, reading and downloading eBooks stored in a Calibre database',
  iconUrl:
    'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/calibre-web.svg',
  id: 'calibre-web',
  name: 'Calibre-Web',
  url: serviceUrl('https://github.com/janeczku/calibre-web'),
} as const satisfies Service
