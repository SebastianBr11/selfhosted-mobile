import { Service } from '../service.schema'

export const wakapi = {
  description:
    'A minimalist, WakaTime-compatible backend for coding statistics',
  iconUrl:
    'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/wakapi.svg',
  id: 'wakapi',
  name: 'Wakapi',
  url: 'https://wakapi.dev',
} as const satisfies Service
