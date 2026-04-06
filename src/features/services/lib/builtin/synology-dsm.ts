import { Service } from '../service.schema'
import { serviceUrl } from './builtin-util'

export const synologyDsm = {
  description: 'The intuitive operating system that powers every Synology NAS.',
  iconUrl:
    'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/synology-dsm.svg',
  id: 'synology-dsm',
  name: 'Synology DSM',
  url: serviceUrl('https://www.synology.com/en-global/dsm'),
} as const satisfies Service
