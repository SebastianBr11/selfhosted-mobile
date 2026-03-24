import { Service } from '../service.schema'

export const synologyPhotos = {
  appStoreLink:
    'https://play.google.com/store/apps/details?id=com.synology.projectkailash',
  description:
    'Your all-in-one solution for organizing, sharing, and safeguarding your precious memories.',
  iconUrl:
    'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/png/synology-photos.png',
  id: 'synology-photos',
  name: 'Synology Photos',
  packageName: 'com.synology.projectkailash',
  url: 'https://www.synology.com/en-global/dsm/feature/photos',
} as const satisfies Service
