import { AlertDialog, Host, Text, TextButton } from '@expo/ui/jetpack-compose'
import { useLingui } from '@lingui/react/macro'
import { useRouter } from 'expo-router'

type FetchServicesErrorDialogProps = {
  hide: () => void
}
export function FetchServicesErrorDialog({
  hide,
}: FetchServicesErrorDialogProps) {
  const router = useRouter()
  const { t } = useLingui()
  return (
    <Host matchContents>
      <AlertDialog onDismissRequest={hide}>
        <AlertDialog.Title>
          <Text
            style={{ typography: 'titleLarge' }}
          >{t`An error ocurred`}</Text>
        </AlertDialog.Title>
        <AlertDialog.Text>
          <Text
            style={{ typography: 'bodyMedium' }}
          >{t`An error ocurred while fetching your services. Go to settings to see the error details.`}</Text>
        </AlertDialog.Text>
        <AlertDialog.ConfirmButton>
          <TextButton
            onClick={() => {
              hide()
              router.navigate('/(settings)')
            }}
          >
            <Text>{t`Go to settings`}</Text>
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
