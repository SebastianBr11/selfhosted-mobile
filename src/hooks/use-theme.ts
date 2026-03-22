import { useMemo } from 'react'
import { getColors } from '@/constants/colors'
import { useColorScheme } from '@/hooks/use-color-scheme'

export function useTheme() {
  // Triggers re-render when system theme changes
  const scheme = useColorScheme()
  return useMemo(getColors, [scheme])
}
