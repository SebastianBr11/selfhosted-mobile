import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { ThemedText } from '@/components/themed-text'
import { useService } from '@/features/services/hooks/use-service'
import { ServiceId } from '@/features/services/lib/service.schema'

export default function ServiceSettingsScreen() {
  const { serviceId } = useLocalSearchParams<{ serviceId: ServiceId }>()
  const service = useService(serviceId)
  const router = useRouter()
  if (!service) return router.dismiss()

  return (
    <>
      <Stack.Screen.Title>{service.name}</Stack.Screen.Title>
      <ThemedText>Service {serviceId}</ThemedText>
    </>
  )
}
