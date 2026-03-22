import { View, type ViewProps } from 'react-native'
import { ThemeColor } from '@/constants/colors'
import { InlineInsetMedium } from '@/constants/theme'
import { useTheme } from '@/hooks/use-theme'

export type ThemedViewProps = ViewProps & {
  inlineInset?: boolean
  type?: ThemeColor
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
        {
          backgroundColor: theme[type ?? 'background'],
          paddingInline: inlineInset ? InlineInsetMedium : 0,
        },
        style,
      ]}
      {...otherProps}
    />
  )
}
