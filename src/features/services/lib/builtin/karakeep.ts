import { Service } from '../service.schema'
import { serviceUrl } from './builtin-util'

export const karakeep = {
  appStoreLink:
    'https://play.google.com/store/apps/details?id=app.hoarder.hoardermobile',
  description:
    'A self-hostable bookmark-everything app with AI-based automatic tagging and full text search.',
  iconUrl: {
    dark: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/karakeep.svg',
    light:
      'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/karakeep-dark.svg',
  },
  id: 'karakeep',
  name: 'Karakeep',
  packageName: 'app.hoarder.hoardermobile',
  url: serviceUrl('https://karakeep.app'),
} as const satisfies Service
