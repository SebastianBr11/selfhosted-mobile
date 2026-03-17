import { Platform, StyleSheet, Text, type TextProps } from 'react-native'

import { Fonts } from '@/constants/theme'
import { useTheme } from '@/hooks/use-theme'
import { getColors, ThemeColor } from '@/constants/colors'

export type ThemedTextProps = TextProps & {
  type?: keyof typeof styles
  themeColor?: ThemeColor
}

export function ThemedText({
  style,
  type = 'default',
  themeColor,
  ...rest
}: ThemedTextProps) {
  const theme = useTheme()

  return (
    <Text
      style={[{ color: theme[themeColor ?? 'text'] }, styles[type], style]}
      {...rest}
    />
  )
}

const styles = StyleSheet.create({
  small: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 500,
  },
  large: {
    fontSize: 24,
    lineHeight: 26,
    fontWeight: 700,
  },
  label: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 500,
  },
  smallBold: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 700,
  },
  default: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 500,
  },
  title: {
    fontSize: 48,
    fontWeight: 700,
    lineHeight: 52,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 32,
    lineHeight: 44,
    fontWeight: 600,
  },
  link: {
    lineHeight: 30,
    fontSize: 14,
  },
  linkPrimary: {
    lineHeight: 30,
    fontSize: 14,
    color: '#3c87f7',
  },
  error: {
    color: getColors().textError,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 700,
  },
  success: {
    color: getColors().textSuccess,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 700,
  },
  button: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 500,
    textAlign: 'center',
  },
  code: {
    fontFamily: Fonts.mono,
    fontWeight: Platform.select({ android: 700 }) ?? 500,
    fontSize: 12,
  },
})
