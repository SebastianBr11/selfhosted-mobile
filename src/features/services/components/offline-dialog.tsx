import { AlertDialog, Host, Text, TextButton } from '@expo/ui/jetpack-compose'
import { useLingui } from '@lingui/react/macro'
import * as IntentLauncher from 'expo-intent-launcher'

type OfflineDialogProps = {
  hide: () => void
}
export function OfflineDialog({ hide }: OfflineDialogProps) {
  const { t } = useLingui()
  return (
    <Host matchContents>
      <AlertDialog onDismissRequest={hide}>
        <AlertDialog.Title>
          <Text style={{ typography: 'titleLarge' }}>{t`You're offline`}</Text>
        </AlertDialog.Title>
        <AlertDialog.Text>
          <Text
            style={{ typography: 'bodyMedium' }}
          >{t`You're offline. Check your network connection and try again.`}</Text>
        </AlertDialog.Text>
        <AlertDialog.ConfirmButton>
          <TextButton
            onClick={() => {
              hide()
              IntentLauncher.startActivityAsync(
                IntentLauncher.ActivityAction.NETWORK_PROVIDER_SETTINGS,
              )
            }}
          >
            <Text>{t`Configure network settings`}</Text>
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
