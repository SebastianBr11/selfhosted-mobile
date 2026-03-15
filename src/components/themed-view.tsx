import { View, type ViewProps } from 'react-native'

import { ThemeColor } from '@/constants/theme'
import { useTheme } from '@/hooks/use-theme'

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
          paddingInline: inlineInset ? 32 : 0,
        },
        style,
      ]}
      {...otherProps}
    />
  )
}
