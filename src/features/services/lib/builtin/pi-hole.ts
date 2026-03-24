import { Service } from '../service.schema'

export const pihole = {
  description: 'A black hole for Internet advertisements',
  iconUrl: 'https://wp-cdn.pi-hole.net/wp-content/uploads/2016/12/Vortex-R.png',
  id: 'pi-hole',
  name: 'Pi-hole',
  url: 'https://pi-hole.net/',
} as const satisfies Service
