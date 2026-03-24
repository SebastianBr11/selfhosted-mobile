import { Service } from '../service.schema'

export const fireflyIII = {
  description: 'A free and open source personal finance manager',
  iconUrl:
    'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/firefly-iii.svg',
  id: 'firefly-iii',
  name: 'Firefly III',
  url: 'https://firefly-iii.org',
} as const satisfies Service
