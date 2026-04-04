import { Stack } from 'expo-router'
import { useTheme } from '@/hooks/use-theme'

export default function ServiceSettingsScreen() {
  const theme = useTheme()
  return (
    <Stack>
      <Stack.Screen
        name="[serviceId]"
        options={{ contentStyle: { backgroundColor: theme.background } }}
      >
        <Stack.Header
          hidden={false}
          style={{ backgroundColor: theme.background }}
        />
      </Stack.Screen>
    </Stack>
  )
}
