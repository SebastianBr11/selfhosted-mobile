import { Color } from 'expo-router'
import { Platform } from 'react-native'

export const getColors = () =>
  Platform.select({
    default: {
      background: Color.android.dynamic.surface,
      backgroundElement: Color.android.dynamic.surfaceContainer,
      backgroundPrimary: Color.android.dynamic.primaryContainer,
      backgroundSelected: Color.android.dynamic.surfaceContainerHighest,
      text: Color.android.dynamic.onSurface,
      textError: Color.android.dynamic.error,
      textPrimary: Color.android.dynamic.primary,
      textSecondary: Color.android.dynamic.onSurfaceVariant,
      textSuccess: Color.android.holo_green_dark,
    },
    ios: {
      background: Color.ios.systemBackground,
      backgroundElement: Color.ios.secondarySystemBackground,
      backgroundPrimary: Color.ios.systemBackground,
      backgroundSelected: Color.ios.tertiarySystemBackground,
      text: Color.ios.label,
      textError: Color.ios.systemRed,
      textPrimary: Color.ios.systemFill,
      textSecondary: Color.ios.secondaryLabel,
      textSuccess: Color.ios.systemGreen,
    },
  } as const)

export type ThemeColor = keyof ReturnType<typeof getColors>
