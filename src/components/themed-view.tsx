import { View, type ViewProps } from 'react-native'
import { ThemeColor } from '@/constants/colors'
import { InlineInsetMedium } from '@/constants/theme'
import { useTheme } from '@/hooks/use-theme'

export type ThemedViewProps = ViewProps & {
  inlineInset?: boolean
  type?: Exclude<ThemeColor, 'android' | 'ios'>
}

export function ThemedView({
  inlineInset,
  style,
  type,
  ...otherProps
}: ThemedViewProps) {
  const theme = useTheme()

  return (
    <View
      style={[
        type && { backgroundColor: theme[type] },
        {
          paddingInline: inlineInset ? InlineInsetMedium : 0,
        },
        style,
      ]}
      {...otherProps}
    />
  )
}
