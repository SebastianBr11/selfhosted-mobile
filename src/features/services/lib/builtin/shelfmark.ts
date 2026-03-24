import { Service } from '../service.schema'

export const shelfmark = {
  description:
    'A self-hosted web interface for searching and downloading books and audiobooks from multiple sources.',
  iconUrl:
    'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/png/shelfmark.png',
  id: 'shelfmark',
  name: 'Shelfmark',
  url: 'https://github.com/calibrain/shelfmark',
} as const satisfies Service
