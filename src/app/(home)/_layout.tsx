import { Stack } from 'expo-router'
import { useTheme } from '@/hooks/use-theme'

export default function HomeLayout() {
  const theme = useTheme()
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          contentStyle: { backgroundColor: theme.background },
        }}
      />
      <Stack.Screen
        name="services/[serviceId]"
        options={{ presentation: 'transparentModal' }}
      />
    </Stack>
  )
}
