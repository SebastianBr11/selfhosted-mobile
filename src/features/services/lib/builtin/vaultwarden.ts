import { Service } from '../service.schema'

export const vaultwarden = {
  appStoreLink:
    'https://play.google.com/store/apps/details?id=com.x8bit.bitwarden',
  description: 'Unofficial Bitwarden compatible server written in Rust',
  iconUrl: {
    dark: 'https://github.com/dani-garcia/vaultwarden/raw/refs/heads/main/resources/vaultwarden-icon-white.svg',
    light:
      'https://github.com/dani-garcia/vaultwarden/raw/refs/heads/main/resources/vaultwarden-icon.svg',
  },
  id: 'vaultwarden',
  name: 'Vaultwarden',
  packageName: 'com.x8bit.bitwarden',
  url: 'https://github.com/dani-garcia/vaultwarden',
} as const satisfies Service
