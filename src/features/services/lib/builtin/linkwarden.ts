import { Service } from '../service.schema'
import { serviceUrl } from './builtin-util'

export const linkwarden = {
  appStoreLink: 'https://play.google.com/store/apps/details?id=app.linkwarden',
  description:
    'Collect, read, annotate, and fully preserve what matters, all in one place.',
  iconUrl:
    'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/png/linkwarden.png',
  id: 'linkwarden',
  name: 'Linkwarden',
  packageName: 'app.linkwarden',
  url: serviceUrl('https://linkwarden.app/website'),
} as const satisfies Service
