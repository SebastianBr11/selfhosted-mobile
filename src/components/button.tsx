import { useTheme } from '@/hooks/use-theme'
import { ActivityIndicator, Pressable, PressableProps } from 'react-native'
import { ThemedText } from './themed-text'
import React from 'react'

type ButtonProps = PressableProps & {
  children: React.ReactNode
  loading?: boolean
}
export default function Button({
  style,
  children,
  loading,
  ...otherProps
}: ButtonProps) {
  const theme = useTheme()
  return (
    <Pressable
      style={{
        padding: 16,
        backgroundColor: theme.backgroundPrimary,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        ...style,
      }}
      {...otherProps}
    >
      <ThemedText type="button" themeColor="textPrimary">
        {children}
      </ThemedText>
      {loading && <ActivityIndicator color={theme.textPrimary} />}
    </Pressable>
  )
}
