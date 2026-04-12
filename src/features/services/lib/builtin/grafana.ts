import { Service } from '../service.schema'
import { serviceUrl } from './builtin-util'

export const grafana = {
  description:
    'The open and composable observability and data visualization platform',
  iconUrl:
    'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/grafana.svg',
  id: 'grafana',
  name: 'Grafana',
  url: serviceUrl('https://grafana.com'),
} as const satisfies Service
