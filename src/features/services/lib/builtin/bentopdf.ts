import { Service } from '../service.schema'
import { serviceUrl } from '../services-util'

export const bentopdf = {
  description: 'A Privacy First PDF Toolkit',
  iconUrl:
    'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/bentopdf.svg',
  id: 'bentopdf',
  name: 'BentoPDF',
  url: serviceUrl('https://bentopdf.com'),
} as const satisfies Service
