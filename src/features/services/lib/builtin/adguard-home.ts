import { Service } from '../service.schema'
import { serviceUrl } from './builtin-util'

export const adguardHome = {
  description: 'Network-wide ads & trackers blocking DNS server',
  iconUrl:
    'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/adguard-home.svg',
  id: 'adguard-home',
  name: 'AdGuard Home',
  url: serviceUrl('https://adguard.com/en/adguard-home/overview.html'),
} as const satisfies Service
