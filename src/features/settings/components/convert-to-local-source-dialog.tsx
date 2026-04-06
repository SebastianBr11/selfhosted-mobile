import { AlertDialog, Host, Text, TextButton } from '@expo/ui/jetpack-compose'
import { useLingui } from '@lingui/react/macro'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'expo-router'
import { useServicesUrl } from '@/features/services/hooks/use-services-url'
import { remoteServicesQueryOptions } from '@/features/services/lib/user-services.queries'
import { setLocalServices } from '../lib/local-servies'

type FetchServicesErrorDialogProps = {
  hide: () => void
}
export function ConvertToLocalSourceDialog({
  hide,
}: FetchServicesErrorDialogProps) {
  const router = useRouter()
  const { t } = useLingui()
  const queryClient = useQueryClient()
  const { url } = useServicesUrl()

  function convertToLocalSourceSettings() {
    const services = queryClient.getQueryData(
      remoteServicesQueryOptions(url).queryKey,
    )
    if (services) {
      setLocalServices(services)
      router.navigate('/settings/local-source-settings')
    }
  }

  return (
    <Host matchContents>
      <AlertDialog onDismissRequest={hide}>
        <AlertDialog.Title>
          <Text
            style={{ typography: 'titleLarge' }}
          >{t`Convert to local services?`}</Text>
        </AlertDialog.Title>
        <AlertDialog.Text>
          <Text
            style={{ typography: 'bodyMedium' }}
          >{t`Are you sure you want to convert the remotely fetched services into locally stored services? This will overwrite any locally stored services. This action cannot be undone.`}</Text>
        </AlertDialog.Text>
        <AlertDialog.ConfirmButton>
          <TextButton
            onClick={() => {
              hide()
              convertToLocalSourceSettings()
            }}
          >
            <Text>{t`Convert to local services`}</Text>
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
