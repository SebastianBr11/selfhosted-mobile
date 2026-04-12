import { ColorSchemeName } from 'react-native'
import { ServiceIconUrl } from '@/features/services/lib/service.schema'
import { SemanticVersion } from '@/lib/schemas'
import { isObject } from '@/util/is-type'

/**
 * Returns -1 if a < b, 0 if a === b, 1 if a > b
 */
export function compareSemanticVersions(
  a: SemanticVersion,
  b: SemanticVersion,
) {
  if (a.major !== b.major) {
    return a.major > b.major ? 1 : -1
  }
  if (a.minor !== b.minor) {
    return a.minor > b.minor ? 1 : -1
  }
  if (a.patch !== b.patch) {
    return a.patch > b.patch ? 1 : -1
  }
  return 0
}

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
