import { Color } from 'expo-router'
import { Platform } from 'react-native'

export const getColors = () => {
  const android = {
    background: Color.android.dynamic.surfaceContainer,
    backgroundDim: Color.android.dynamic.surfaceDim,
    backgroundElement: Color.android.dynamic.surfaceBright,
    backgroundElementHigh: Color.android.dynamic.surfaceContainerHigh,
    backgroundElementHighest: Color.android.dynamic.surfaceContainerHighest,
    backgroundElementLow: Color.android.dynamic.surfaceContainerLow,
    backgroundElementLowest: Color.android.dynamic.surfaceContainerLowest,
    backgroundPrimary: Color.android.dynamic.primaryContainer,
    backgroundSecondary: Color.android.dynamic.secondaryContainer,
    backgroundTertiary: Color.android.dynamic.tertiaryContainer,
    onSurface: Color.android.dynamic.onSurface,
    onSurfaceInverse: Color.android.dynamic.onSurfaceInverse,
    onSurfaceVariant: Color.android.dynamic.onSurfaceVariant,
    surface: Color.android.dynamic.surface,
    textError: '#dc2626',
    textPrimary: Color.android.dynamic.primary,
    textSecondary: Color.android.dynamic.onSurfaceVariant,
    textSuccess: '#28A745',
    textTertiary: Color.android.dynamic.onTertiary,
  } as const
  const ios = {
    background: Color.ios.systemBackground,
    backgroundElement: Color.ios.secondarySystemBackground,
    backgroundElementHighest: Color.ios.tertiarySystemBackground,
    backgroundPrimary: Color.ios.systemBackground,
    onSurface: Color.ios.label,
    onSurfaceVariant: Color.ios.secondaryLabel,
    textError: Color.ios.systemRed,
    textPrimary: Color.ios.systemFill,
    textSecondary: Color.ios.secondaryLabel,
    textSuccess: Color.ios.systemGreen,
  } as const
  return {
    ...Platform.select({
      default: android,
      ios,
    } as const),
    android,
    ios,
  }
}

export type ThemeColor = keyof ReturnType<typeof getColors>
