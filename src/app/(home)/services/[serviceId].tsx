import { useLocalSearchParams, useRouter } from 'expo-router'
import ServiceBottomSheet from '@/features/services/components/service-bottom-sheet'
import { ServiceId } from '@/features/services/lib/services.system'

export default function ServiceScreen() {
  const router = useRouter()
  const { serviceId } = useLocalSearchParams<{ serviceId: ServiceId }>()
  return (
    <ServiceBottomSheet
      hide={() => router.dismiss()}
      serviceId={serviceId}
    ></ServiceBottomSheet>
  )
}
