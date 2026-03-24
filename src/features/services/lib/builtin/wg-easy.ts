import { Service } from '../service.schema'

export const wgeasy = {
  description: 'The easiest way to run WireGuard VPN + Web-based Admin UI.',
  iconUrl:
    'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/wireguard.svg',
  id: 'wg-easy',
  name: 'wg-easy',
  url: 'https://wg-easy.github.io/wg-easy/latest/',
} as const satisfies Service
