import { View, type ViewProps } from 'react-native'

import { useTheme } from '@/hooks/use-theme'
import { ThemeColor } from '@/constants/colors'
import { InlineInsetMedium } from '@/constants/theme'

export type ThemedViewProps = ViewProps & {
  type?: ThemeColor
  inlineInset?: boolean
}

export function ThemedView({
  style,
  type,
  inlineInset,
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
