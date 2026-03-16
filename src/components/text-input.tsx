import {
  TextInputProps as BaseTextInputProps,
  TextInput as BaseTextInput,
} from 'react-native'

import { useTheme } from '@/hooks/use-theme'
import { ThemeColor } from '@/constants/colors'

export type TextInputProps = BaseTextInputProps & {
  color?: ThemeColor
}

export function TextInput({ style, ...otherProps }: TextInputProps) {
  const theme = useTheme()

  return (
    <BaseTextInput
      style={[
        {
          backgroundColor: theme.backgroundSelected,
          color: otherProps.editable ? theme.text : theme.textSecondary,
        },
        { borderRadius: 8, height: 48, paddingLeft: 20 },
        style,
      ]}
      {...otherProps}
    />
  )
}
