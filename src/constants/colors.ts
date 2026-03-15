import { Color } from 'expo-router'
import { Platform } from 'react-native'

export const getColors = () =>
  Platform.select({
    ios: {
      text: Color.ios.label,
      textPrimary: Color.ios.systemFill,
      textSecondary: Color.ios.secondaryLabel,
      textError: Color.ios.systemRed,
      textSuccess: Color.ios.systemGreen,
      background: Color.ios.systemBackground,
      backgroundElement: Color.ios.secondarySystemBackground,
      backgroundSelected: Color.ios.tertiarySystemBackground,
      backgroundPrimary: Color.ios.systemBackground,
    },
    default: {
      text: Color.android.dynamic.onSurface,
      textPrimary: Color.android.dynamic.primary,
      textSecondary: Color.android.dynamic.onSurfaceVariant,
      textError: Color.android.dynamic.error,
      textSuccess: Color.android.holo_green_dark,
      background: Color.android.dynamic.surface,
      backgroundElement: Color.android.dynamic.surfaceContainer,
      backgroundSelected: Color.android.dynamic.surfaceContainerHighest,
      backgroundPrimary: Color.android.dynamic.primaryContainer,
    },
  } as const)

export type ThemeColor = keyof ReturnType<typeof getColors>
