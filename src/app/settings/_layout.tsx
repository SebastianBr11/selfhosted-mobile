import { useLingui } from '@lingui/react/macro'
import { Stack } from 'expo-router'
import { useTheme } from '@/hooks/use-theme'

export default function SettingsLayout() {
  const theme = useTheme()
  const { t } = useLingui()
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: theme.background },
        headerShown: false,
      }}
    >
      <Stack.Screen name="(services-source)" />
      <Stack.Screen name="index" />
      <Stack.Screen
        name="select-services"
        options={{ presentation: 'transparentModal' }}
      />
      <Stack.Screen name="more-settings">
        <Stack.Header
          hidden={false}
          style={{ backgroundColor: theme.background }}
        />
        <Stack.Screen.Title>{t`More settings`}</Stack.Screen.Title>
      </Stack.Screen>
      <Stack.Screen name="service-settings" />
    </Stack>
  )
}
