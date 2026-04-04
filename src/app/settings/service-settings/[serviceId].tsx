import { useLingui } from '@lingui/react/macro'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { builtInServices } from '@/features/services/lib/builtin'
import { ServiceId } from '@/features/services/lib/service.schema'
import { useLocalService } from '@/features/settings/lib/local-servies'
import ServiceSettingsView from '@/features/settings/service-settings-view'

export default function ServiceSettingsScreen() {
  const { t } = useLingui()
  const { serviceId } = useLocalSearchParams<{ serviceId: ServiceId }>()
  const { service, updateService } = useLocalService(serviceId)
  const router = useRouter()
  if (!service) return router.dismiss()

  const serviceName = service.name
  const builtIn = builtInServices.find((service) => service.id === serviceId)!

  return (
    <>
      <Stack.Screen.Title>{t`${serviceName} Settings`}</Stack.Screen.Title>
      <ServiceSettingsView
        builtIn={builtIn}
        service={service}
        updateService={updateService}
      />
    </>
  )
}
