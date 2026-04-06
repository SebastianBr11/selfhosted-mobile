import { Service } from '../service.schema'
import { serviceUrl } from '../services-util'

export const paperless = {
  appStoreLink:
    'https://f-droid.org/en/packages/de.astubenbord.paperless_mobile/',
  description:
    'A community-supported supercharged document management system: scan, index and archive all your documents',
  iconUrl:
    'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/paperless-ngx.svg',
  id: 'paperless',
  name: 'Paperless-ngx',
  url: serviceUrl('https://docs.paperless-ngx.com/'),
} as const satisfies Service
