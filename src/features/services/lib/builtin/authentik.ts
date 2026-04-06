import { Service } from '../service.schema'
import { serviceUrl } from '../services-util'

export const authentik = {
  description: 'The authentication glue you need.',
  iconUrl:
    'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/authentik.svg',
  id: 'authentik',
  name: 'Authentik',
  url: serviceUrl('https://goauthentik.io'),
} as const satisfies Service
