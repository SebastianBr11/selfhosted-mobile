import { Service } from '../service.schema'

export const authentik = {
  description: 'The authentication glue you need.',
  iconUrl:
    'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/authentik.svg',
  id: 'authentik',
  name: 'Authentik',
  url: 'https://goauthentik.io',
} as const satisfies Service
