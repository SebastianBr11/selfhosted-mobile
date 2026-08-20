import { Service } from '../service.schema'
import { serviceUrl } from './builtin-util'

export const romm = {
  description: 'A beautiful, powerful, self-hosted rom manager and player.',
  iconUrl:
    'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/romm.svg',
  id: 'romm',
  name: 'Romm',
  packageName: 'io.github.mattsays.rommmobile',
  url: serviceUrl('https://romm.app/'),
} as const satisfies Service
