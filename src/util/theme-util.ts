import { ColorSchemeName } from 'react-native'
import { isObject } from './is-type'
import { ServiceIconUrl } from '@/lib/service.schema'

export function schemeDependantIcon(
  theme: ColorSchemeName,
  iconUrl: ServiceIconUrl,
): string {
  if (!isObject(iconUrl)) {
    return iconUrl
  }
  switch (theme) {
    case 'dark':
      return iconUrl.dark
    case 'light':
      return iconUrl.light
    default:
      return iconUrl.light
  }
}
