import { Redirect, Stack, useLocalSearchParams } from 'expo-router'
import { ThemedText } from '@/components/themed-text'
import { useService } from '@/features/services/hooks/use-services'
import { ServiceId } from '@/features/services/lib/service.schema'

export default function ServiceSettingsScreen() {
  const { serviceId } = useLocalSearchParams<{ serviceId: ServiceId }>()
  const service = useService(serviceId)
  if (!service) return <Redirect href="/(home)" />

  return (
    <>
      <Stack.Screen.Title>{service.name}</Stack.Screen.Title>
      <ThemedText>Service {serviceId}</ThemedText>
    </>
  )
}
