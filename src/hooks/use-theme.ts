import { colors } from '@/constants/theme'
import { useColorScheme } from '@/hooks/use-color-scheme'

export function useTheme() {
  // Triggers re-render when system theme changes
  useColorScheme()
  return colors
}
