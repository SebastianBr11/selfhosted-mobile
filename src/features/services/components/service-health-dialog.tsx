import { AlertDialog, Host, Text, TextButton } from '@expo/ui/jetpack-compose'
import { useLingui } from '@lingui/react/macro'

type ServiceHealthDialogProps = {
  healthy: boolean
  unavailable: boolean
} & {
  hide: () => void
}
export function ServiceHealthDialog({
  healthy,
  hide,
  unavailable,
}: ServiceHealthDialogProps) {
  const { t } = useLingui()
  console.log('hi')
  return (
    <Host matchContents>
      <AlertDialog onDismissRequest={hide}>
        <AlertDialog.Title>
          <Text style={{ typography: 'titleLarge' }}>
            {unavailable
              ? t`Service is unavailable`
              : healthy
                ? t`Service is healthy`
                : t`Service is unhealthy`}
          </Text>
        </AlertDialog.Title>
        <AlertDialog.Text>
          <Text style={{ typography: 'bodyMedium' }}>
            {unavailable
              ? t`The service cannot be reached. Make sure it is running and try again.`
              : healthy
                ? t`Your service is healthy. There is nothing to do.`
                : t`Your service is unhealthy. You should probably check it out.`}
          </Text>
        </AlertDialog.Text>
        <AlertDialog.DismissButton>
          <TextButton onClick={hide}>
            <Text>{t`Dismiss`}</Text>
          </TextButton>
        </AlertDialog.DismissButton>
      </AlertDialog>
    </Host>
  )
}
