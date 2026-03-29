import { useLocalSearchParams, useRouter } from 'expo-router'
import { ServiceId } from '@/features/services/lib/service.schema'
import ServiceBottomSheet from '@/features/services/service-bottom-sheet'

export default function ServiceScreen() {
  const router = useRouter()
  const { serviceId } = useLocalSearchParams<{ serviceId: ServiceId }>()
  return (
    <ServiceBottomSheet
      hide={() => router.back()}
      serviceId={serviceId}
    ></ServiceBottomSheet>
  )
}
