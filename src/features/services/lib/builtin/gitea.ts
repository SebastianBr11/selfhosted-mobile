import { Service } from '../service.schema'
import { serviceUrl } from '../services-util'

export const gitea = {
  description: 'Painless self-hosted all-in-one software development service',
  iconUrl:
    'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/gitea.svg',
  id: 'gitea',
  name: 'Gitea',
  url: serviceUrl('https://about.gitea.com/'),
} as const satisfies Service
