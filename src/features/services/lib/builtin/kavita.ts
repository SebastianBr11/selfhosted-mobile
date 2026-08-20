import { Service } from '../service.schema'
import { serviceUrl } from './builtin-util'

export const kavita = {
  description: 'A fast, feature rich, cross platform reading server. ',
  iconUrl:
    'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/kavita.svg',
  id: 'kavita',
  name: 'Kavita',
  url: serviceUrl('https://www.kavitareader.com'),
} as const satisfies Service
