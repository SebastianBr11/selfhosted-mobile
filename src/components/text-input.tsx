import {
  TextInputProps as BaseTextInputProps,
  TextInput as BaseTextInput,
} from 'react-native'

import { ThemeColor } from '@/constants/theme'
import { useTheme } from '@/hooks/use-theme'

export type TextInputProps = BaseTextInputProps & {
  color?: ThemeColor
}

export function TextInput({ style, ...otherProps }: TextInputProps) {
  const theme = useTheme()

  return (
    <BaseTextInput
      style={[
        { backgroundColor: theme.backgroundSelected, color: theme.text },
        { borderRadius: 8, height: 48, paddingLeft: 20 },
        style,
      ]}
      {...otherProps}
    />
  )
}
