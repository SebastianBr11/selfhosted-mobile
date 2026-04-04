import { useLingui } from '@lingui/react/macro'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { useService } from '@/features/services/hooks/use-service'
import { ServiceId } from '@/features/services/lib/service.schema'
import ServiceSettingsView from '@/features/settings/service-settings-view'

export default function ServiceSettingsScreen() {
  const { t } = useLingui()
  const { serviceId } = useLocalSearchParams<{ serviceId: ServiceId }>()
  const service = useService(serviceId)
  const router = useRouter()
  if (!service) return router.dismiss()

  const serviceName = service.name

  return (
    <>
      <Stack.Screen.Title>{t`${serviceName} Settings`}</Stack.Screen.Title>
      <ServiceSettingsView serviceId={serviceId} />
    </>
  )
}
