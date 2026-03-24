import { ColorSchemeName } from 'react-native'
import { ServiceIconUrl } from '@/features/services/lib/service.schema'
import { isObject } from '@/util/is-type'

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
