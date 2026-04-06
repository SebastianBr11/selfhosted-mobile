import { Service } from '../service.schema'
import { serviceUrl } from './builtin-util'

export const yourspotify = {
  description: 'Self hosted Spotify tracking dashboard',
  iconUrl:
    'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/your-spotify.svg',
  id: 'your-spotify',
  name: 'Your Spotify',
  url: serviceUrl('https://github.com/Yooooomi/your_spotify'),
} as const satisfies Service
