import { Host, Icon, IconButton } from '@expo/ui/jetpack-compose'
import { useLingui } from '@lingui/react/macro'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { builtInServices } from '@/features/services/lib/builtin'
import { ServiceId } from '@/features/services/lib/service.schema'
import { useLocalService } from '@/features/settings/lib/local-servies'
import ServiceSettingsView from '@/features/settings/service-settings-view'
import { useTheme } from '@/hooks/use-theme'

export default function ServiceSettingsScreen() {
  const { t } = useLingui()
  const { serviceId } = useLocalSearchParams<{ serviceId: ServiceId }>()
  const { resetService, service, updateService } = useLocalService(serviceId)
  const router = useRouter()
  const theme = useTheme()

  if (!service) return router.replace('/settings/local-source-settings')

  const serviceName = service.name
  const builtIn = builtInServices.find((service) => service.id === serviceId)!

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Host matchContents>
              <IconButton onClick={resetService}>
                <Icon
                  contentDescription="Reset Service Settings"
                  size={24}
                  source={require('@/assets/symbols/reset_settings.xml')}
                  tintColor={theme.onSurface}
                />
              </IconButton>
            </Host>
          ),
        }}
      />
      <Stack.Screen.Title>{t`${serviceName} Settings`}</Stack.Screen.Title>
      <ServiceSettingsView
        builtIn={builtIn}
        service={service}
        updateService={updateService}
      />
    </>
  )
}
