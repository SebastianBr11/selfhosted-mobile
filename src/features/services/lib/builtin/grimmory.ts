import { Service } from '../service.schema'
import { serviceUrl } from './builtin-util'

export const grimmory = {
  description:
    'Grimmory is the successor of booklore. A modern way to organize, read, and own your digital library.',
  iconUrl:
    'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/booklore.svg',
  id: 'grimmory',
  name: 'Grimmory',
  url: serviceUrl('https://github.com/grimmory-tools/grimmory'),
} as const satisfies Service
