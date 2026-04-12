import { Service } from '../service.schema'
import { serviceUrl } from './builtin-util'

export const synologyDrive = {
  appStoreLink:
    'https://play.google.com/store/apps/details?id=com.synology.dsdrive',
  description:
    'Your unified solution for effortless file management and secure collaboration.',
  iconUrl:
    'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/png/synology-drive.png',
  id: 'synology-drive',
  name: 'Synology Drive',
  packageName: 'com.synology.dsdrive',
  url: serviceUrl('https://www.synology.com/en-global/dsm/feature/drive'),
} as const satisfies Service
