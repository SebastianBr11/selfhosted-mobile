import { Service } from '../service.schema'

export const jellyfin = {
  appStoreLink:
    'https://play.google.com/store/apps/details?id=org.jellyfin.mobile',
  description: 'The Free Software Media System',
  iconUrl:
    'https://raw.githubusercontent.com/jellyfin/jellyfin-ux/36fe7e93c830f53e5a5573745c15a43f5244f1e9/logos/SVG/jellyfin-icon--color-on-dark.svg',
  id: 'jellyfin',
  name: 'Jellyfin',
  packageName: 'org.jellyfin.mobile',
  url: 'https://jellyfin.org/',
} as const satisfies Service
