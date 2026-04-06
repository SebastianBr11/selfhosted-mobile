import { Service } from '../service.schema'
import { serviceUrl } from '../services-util'

export const otterwiki = {
  description: 'A minimalistic wiki powered by python, markdown and git.',
  iconUrl: {
    dark: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/otter-wiki-dark.svg',
    light:
      'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/otter-wiki.svg',
  },
  id: 'otterwiki',
  name: 'An Otter Wiki',
  url: serviceUrl('https://otterwiki.com/'),
} as const satisfies Service
