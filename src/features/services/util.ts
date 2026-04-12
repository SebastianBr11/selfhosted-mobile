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
  console.log(a.raw, b.raw)
  if (a.major !== b.major) {
    console.log('major bigger', a.major > b.major ? a.raw : b.raw)
    return a.major > b.major ? 1 : -1
  }
  if (a.minor !== b.minor) {
    console.log('minor bigger', a.minor > b.minor ? a.raw : b.raw)
    return a.minor > b.minor ? 1 : -1
  }
  if (a.patch !== b.patch) {
    console.log('patch bigger', a.patch > b.patch ? a.raw : b.raw)
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
