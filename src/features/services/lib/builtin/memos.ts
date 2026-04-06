import { Service } from '../service.schema'
import { serviceUrl } from '../services-util'

export const memos = {
  description: 'A private timeline for your thoughts.',
  iconUrl:
    'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/memos.svg',
  id: 'memos',
  name: 'Memos',
  url: serviceUrl('https://usememos.com'),
} as const satisfies Service
