import { Redirect, useLocalSearchParams } from 'expo-router'
import { useEffect } from 'react'
import { ServiceId } from '@/features/services/lib/service.schema'
import { useLocalServices } from '@/features/settings/lib/local-servies'

export default function AddScreen() {
  const { serviceId } = useLocalSearchParams<{ serviceId: ServiceId }>()
  const { addServiceById, servicesIdsSet } = useLocalServices()

  useEffect(
    function addNonExistingService() {
      if (servicesIdsSet.has(serviceId)) return
      addServiceById(serviceId)
    },
    [addServiceById, serviceId, servicesIdsSet],
  )

  return (
    <Redirect
      href={{
        params: { serviceId },
        pathname: '/settings/service-settings/[serviceId]',
      }}
    />
  )
}
