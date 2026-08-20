import { Service } from '../service.schema'
import { serviceUrl } from './builtin-util'

export const wallabag = {
  appStoreLink:
    'https://play.google.com/store/apps/details?id=fr.gaulupeau.apps.InThePoche',
  description: 'Save and classify articles. Read them later. Freely.',
  iconUrl: {
    dark: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/wallabag-light.svg',
    light:
      'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/wallabag.svg',
  },
  id: 'wallabag',
  name: 'Wallabag',
  packageName: 'fr.gaulupeau.apps.InThePoche',
  url: serviceUrl('https://wallabag.org'),
} as const satisfies Service
