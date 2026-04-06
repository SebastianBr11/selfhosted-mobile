import { AlertDialog, Host, Text, TextButton } from '@expo/ui/jetpack-compose'
import { useLingui } from '@lingui/react/macro'
import { ServiceId } from '@/features/services/lib/service.schema'
import { useLocalService } from '../lib/local-servies'

type ResetServiceSettingsDialogProps = {
  hide: () => void
  serviceId: ServiceId
}
export function ResetServiceSettingsDialog({
  hide,
  serviceId,
}: ResetServiceSettingsDialogProps) {
  const { t } = useLingui()
  const { resetService } = useLocalService(serviceId)

  return (
    <Host matchContents>
      <AlertDialog onDismissRequest={hide}>
        <AlertDialog.Title>
          <Text
            style={{ typography: 'titleLarge' }}
          >{t`Reset service settings?`}</Text>
        </AlertDialog.Title>
        <AlertDialog.Text>
          <Text
            style={{ typography: 'bodyMedium' }}
          >{t`Are you sure you want to reset the settings for this service? This will overwrite the current settings. This action cannot be undone.`}</Text>
        </AlertDialog.Text>
        <AlertDialog.ConfirmButton>
          <TextButton
            onClick={() => {
              hide()
              resetService()
            }}
          >
            <Text>{t`Reset settings`}</Text>
          </TextButton>
        </AlertDialog.ConfirmButton>
        <AlertDialog.DismissButton>
          <TextButton onClick={hide}>
            <Text>{t`Dismiss`}</Text>
          </TextButton>
        </AlertDialog.DismissButton>
      </AlertDialog>
    </Host>
  )
}
