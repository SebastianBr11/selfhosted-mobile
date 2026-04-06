import { Service } from '../service.schema'
import { serviceUrl } from '../services-util'

export const syncthing = {
  appStoreLink:
    'https://f-droid.org/packages/com.github.catfriend1.syncthingfork',
  description: 'Open Source Continuous File Synchronization',
  iconUrl: {
    dark: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/syncthing-dark.svg',
    light:
      'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/syncthing.svg',
  },
  id: 'syncthing',
  name: 'Syncthing',
  packageName: 'com.github.catfriend1.syncthingfork',
  url: serviceUrl('https://syncthing.net'),
} as const satisfies Service
