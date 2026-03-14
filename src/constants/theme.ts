import '@/global.css'
import { Color } from 'expo-router'
import { Platform } from 'react-native'

const theme = {
  ios: {
    text: Color.ios.label,
    textSecondary: Color.ios.secondaryLabel,
    textError: Color.ios.systemRed,
    background: Color.ios.systemBackground,
    backgroundElement: Color.ios.secondarySystemBackground,
    backgroundSelected: Color.ios.tertiarySystemBackground,
  },
  android: {
    text: Color.android.dynamic.onSurface,
    textSecondary: Color.android.dynamic.onSurfaceVariant,
    textError: Color.android.dynamic.error,
    background: Color.android.dynamic.surface,
    backgroundElement: Color.android.dynamic.surfaceContainer,
    backgroundSelected: Color.android.dynamic.surfaceContainerHighest,
  },
} as const

export const colors = () =>
  Platform.select({
    ios: theme.ios,
    default: theme.android,
  })

export type ThemeColor = keyof typeof theme.android & keyof typeof theme.ios

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
})

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0
export const MaxContentWidth = 800
