import { ColorValue } from 'react-native'

export function withOpacity(color: ColorValue, opacity: number): string {
  const decimalOpacity = Math.round(opacity * 255)
  const hexOpacity = decimalOpacity.toString(16).padStart(2, '0')
  return `${String(color)}${hexOpacity}`
}
