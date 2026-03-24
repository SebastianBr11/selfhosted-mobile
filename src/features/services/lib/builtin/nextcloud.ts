import { Service } from '../service.schema'

export const nextcloud = {
  appStoreLink:
    'https://play.google.com/store/apps/details?id=com.nextcloud.client',
  description: 'A safe home for all your data.',
  iconUrl:
    'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/nextcloud.svg',
  id: 'nextcloud',
  name: 'Nextcloud',
  packageName: 'com.nextcloud.client',
  url: 'https://nextcloud.com',
} as const satisfies Service
