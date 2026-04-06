import { Service } from '../service.schema'
import { serviceUrl } from '../services-util'

export const yamtrack = {
  description:
    'A self hosted media tracker for movies, tv shows, anime, manga, video games, books, comics, and board games.',
  iconUrl: {
    dark: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/yamtrack.svg',
    light:
      'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/yamtrack-light.svg',
  },
  id: 'yamtrack',
  name: 'Yamtrack',
  url: serviceUrl('https://github.com/FuzzyGrim/Yamtrack'),
} as const satisfies Service
