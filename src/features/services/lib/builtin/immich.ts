import { Service } from '../service.schema'

export const immich = {
  appStoreLink: 'https://get.immich.app/android',
  description: 'Self-hosted photo and video management solution',
  iconUrl:
    'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/immich.svg',
  id: 'immich',
  name: 'Immich',
  packageName: 'app.alextran.immich',
  url: 'https://immich.app/',
} as const satisfies Service
