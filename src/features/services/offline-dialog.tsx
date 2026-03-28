import { Host } from '@expo/ui/jetpack-compose'
import { useLingui } from '@lingui/react/macro'
import * as IntentLauncher from 'expo-intent-launcher'
import AlertDialog from '@/components/jetpack-compose/alert-dialog'

type OfflineDialogProps = {
  hide: () => void
}
export function OfflineDialog({ hide }: OfflineDialogProps) {
  const { t } = useLingui()
  return (
    <Host matchContents>
      <AlertDialog
        confirmButtonText={t`Configure network settings`}
        dismissButtonText={t`Dismiss`}
        onConfirmPressed={() => {
          hide()
          IntentLauncher.startActivityAsync(
            IntentLauncher.ActivityAction.NETWORK_PROVIDER_SETTINGS,
          )
        }}
        onDismissPressed={hide}
        text={t`You're offline. Check your network connection and try again.`}
        title={t`You're offline`}
      />
    </Host>
  )
}
