import { Host } from '@expo/ui/jetpack-compose'
import { useLingui } from '@lingui/react/macro'
import { useRouter } from 'expo-router'
import AlertDialog from '@/components/jetpack-compose/alert-dialog'

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
      <AlertDialog
        confirmButtonText={t`Go to settings`}
        dismissButtonText={t`Dismiss`}
        onConfirmPressed={() => {
          hide()
          router.navigate('/settings')
        }}
        onDismissPressed={hide}
        text={t`An error ocurred while fetching your services. Go to settings to see the error details.`}
        title={t`An error ocurred`}
      />
    </Host>
  )
}
