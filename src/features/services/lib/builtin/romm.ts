import { Service } from '../service.schema'

export const romm = {
  description: 'A beautiful, powerful, self-hosted rom manager and player.',
  iconUrl: 'https://romm.app/_ipx/q_80/images/blocks/logos/romm.svg',
  id: 'romm',
  name: 'Romm',
  packageName: 'io.github.mattsays.rommmobile',
  url: 'https://romm.app/',
} as const satisfies Service
