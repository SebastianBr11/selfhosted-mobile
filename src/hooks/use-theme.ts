import { useColorScheme } from '@/hooks/use-color-scheme'
import { useMemo } from 'react'
import { getColors } from '@/constants/colors'

export function useTheme() {
  // Triggers re-render when system theme changes
  const scheme = useColorScheme()
  return useMemo(getColors, [scheme])
}
