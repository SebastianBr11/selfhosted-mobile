import { Platform, StyleSheet, Text, type TextProps } from 'react-native'
import { getColors, ThemeColor } from '@/constants/colors'
import { Fonts } from '@/constants/theme'
import { useTheme } from '@/hooks/use-theme'
import { withOpacity } from '@/util/color-util'

export type ThemedTextProps = TextProps & {
  disabled?: boolean
  themeColor?: Exclude<ThemeColor, 'android' | 'ios'>
  type?: keyof ReturnType<typeof styles>
}

export function ThemedText({
  disabled = false,
  style,
  themeColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const theme = useTheme()

  return (
    <Text
      style={[
        {
          color: disabled
            ? withOpacity(theme[themeColor ?? 'onSurface'], 0.38)
            : theme[themeColor ?? 'onSurface'],
        },
        styles(disabled)[type],
        style,
      ]}
      {...rest}
    />
  )
}

const styles = (disabled: boolean) =>
  StyleSheet.create({
    button: {
      fontSize: 16,
      fontWeight: 500,
      lineHeight: 24,
      textAlign: 'center',
    },
    code: {
      fontFamily: Fonts.mono,
      fontSize: 12,
      fontWeight: Platform.select({ android: 700 }) ?? 500,
    },
    default: {
      fontSize: 16,
      fontWeight: 500,
      lineHeight: 24,
    },
    error: {
      color: withOpacity(getColors().textError, disabled ? 0.38 : 1),
      fontSize: 14,
      fontWeight: 700,
      lineHeight: 20,
    },
    label: {
      fontSize: 14,
      fontWeight: 500,
      lineHeight: 20,
    },
    large: {
      fontSize: 24,
      fontWeight: 700,
      lineHeight: 26,
    },
    link: {
      fontSize: 14,
      lineHeight: 30,
    },
    linkPrimary: {
      color: '#3c87f7',
      fontSize: 14,
      lineHeight: 30,
    },
    small: {
      fontSize: 14,
      fontWeight: 500,
      lineHeight: 20,
    },
    smallBold: {
      fontSize: 14,
      fontWeight: 700,
      lineHeight: 20,
    },
    subtitle: {
      fontSize: 32,
      fontWeight: 600,
      lineHeight: 44,
    },
    success: {
      color: withOpacity(getColors().textSuccess, disabled ? 0.38 : 1),
      fontSize: 14,
      fontWeight: 700,
      lineHeight: 20,
    },
    title: {
      fontSize: 48,
      fontWeight: 700,
      lineHeight: 52,
      textAlign: 'center',
    },
  })
