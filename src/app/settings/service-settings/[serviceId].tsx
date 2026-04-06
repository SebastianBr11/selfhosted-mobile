import { Host, Icon, IconButton } from '@expo/ui/jetpack-compose'
import { useLingui } from '@lingui/react/macro'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { useState } from 'react'
import { builtInServices } from '@/features/services/lib/builtin'
import { ServiceId } from '@/features/services/lib/service.schema'
import { ResetServiceSettingsDialog } from '@/features/settings/components/reset-service-settings-dialog'
import { useLocalService } from '@/features/settings/lib/local-servies'
import ServiceSettingsView from '@/features/settings/service-settings-view'
import { useTheme } from '@/hooks/use-theme'

export default function ServiceSettingsScreen() {
  const { t } = useLingui()
  const { serviceId } = useLocalSearchParams<{ serviceId: ServiceId }>()
  const { service, updateService } = useLocalService(serviceId)
  const router = useRouter()
  const theme = useTheme()

  const [showResetDialog, setShowResetDialog] = useState(false)

  if (!service) return router.replace('/settings/local-source-settings')

  const serviceName = service.name
  const builtIn = builtInServices.find((service) => service.id === serviceId)!

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Host matchContents>
              <IconButton onClick={() => setShowResetDialog(true)}>
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
        // The key is used to force a re-render when the reset dialog is shown, so that the form is reset.
        // In development, this might cause a delay before the reset dialog is shown,
        // but in production, the reset dialog is shown immediately.
        key={showResetDialog ? 'reset' : null}
        service={service}
        updateService={updateService}
      />
      {showResetDialog && (
        <ResetServiceSettingsDialog
          hide={() => setShowResetDialog(false)}
          serviceId={serviceId}
        />
      )}
    </>
  )
}
