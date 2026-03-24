import { Service } from '../service.schema'

export const synologyCalendar = {
  description:
    'Centrally track events and tasks on a reliable, secure, and private platform.',
  iconUrl:
    'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/png/synology-calendar.png',
  id: 'synology-calendar',
  name: 'Synology Calendar',
  url: 'https://www.synology.com/en-global/dsm/feature/calendar',
} as const satisfies Service
