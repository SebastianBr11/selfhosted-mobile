import { Service } from '../service.schema'
import { serviceUrl } from './builtin-util'

export const mealie = {
  description: 'A self hosted recipe manager and meal planner',
  iconUrl:
    'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/mealie.svg',
  id: 'mealie',
  name: 'Mealie',
  url: serviceUrl('https://docs.mealie.io'),
} as const satisfies Service
