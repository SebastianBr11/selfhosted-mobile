import {
  AlertDialog,
  Column,
  Host,
  Text,
  TextButton,
} from '@expo/ui/jetpack-compose'
import { useLingui } from '@lingui/react/macro'

type ServiceHealthDialogProps = {
  error: Error | null
  healthy: boolean
} & {
  hide: () => void
}
export function ServiceHealthDialog({
  error,
  healthy,
  hide,
}: ServiceHealthDialogProps) {
  const { t } = useLingui()
  const unavailable = !!error
  const errorMessage = String(error)
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
          <Column verticalArrangement={{ spacedBy: 16 }}>
            <Text style={{ typography: 'bodyMedium' }}>
              {unavailable
                ? t`The service cannot be reached. Make sure it is running and try again. See the error details below`
                : healthy
                  ? t`Your service is healthy. There is nothing to do.`
                  : t`Your service is unhealthy. You should probably check it out.`}
            </Text>
            {unavailable && (
              <Text style={{ fontFamily: 'monospace' }}>{errorMessage}</Text>
            )}
          </Column>
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
