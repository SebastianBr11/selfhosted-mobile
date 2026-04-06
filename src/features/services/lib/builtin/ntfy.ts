import { Service } from '../service.schema'
import { serviceUrl } from '../services-util'

export const ntfy = {
  appStoreLink: 'https://play.google.com/store/apps/details?id=io.heckel.ntfy',
  description:
    'Send push notifications to your phone or desktop using PUT/POST',
  iconUrl:
    'https://github.com/binwiederhier/ntfy/raw/main/web/public/static/images/ntfy.png',
  id: 'ntfy',
  name: 'ntfy',
  packageName: 'io.heckel.ntfy',
  url: serviceUrl('https://ntfy.sh/'),
} as const satisfies Service
