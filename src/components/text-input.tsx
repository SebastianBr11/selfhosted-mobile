import {
  TextInput as BaseTextInput,
  TextInputProps as BaseTextInputProps,
} from 'react-native'
import { ThemeColor } from '@/constants/colors'
import { useTheme } from '@/hooks/use-theme'

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
