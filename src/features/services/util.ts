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
  const a1 = a.split('.')
  const b1 = b.split('.')
  const len = Math.min(a1.length, b1.length)

  for (let i = 0; i < len; i++) {
    const a2 = +a1[i] || 0
    const b2 = +b1[i] || 0

    if (a2 !== b2) {
      return a2 > b2 ? 1 : -1
    }
  }

  return b1.length - a1.length
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
