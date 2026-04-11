import { Redirect, useLocalSearchParams } from 'expo-router'
import { useEffect } from 'react'
import { ServiceId } from '@/features/services/lib/services.system'
import { useLocalServices } from '@/features/settings/lib/local-servies'

export default function AddScreen() {
  const { serviceId, ...serviceParams } = useLocalSearchParams<{
    appStoreLink?: string
    description?: string
    iconUrl?: string
    name?: string
    packageName?: string
    serviceId: ServiceId
    url?: string
  }>()
  const { addServiceById, servicesIdsSet, updateService } = useLocalServices()

  useEffect(
    function addNonExistingService() {
      if (servicesIdsSet.has(serviceId)) {
        updateService({ ...serviceParams, id: serviceId })
      } else {
        addServiceById(serviceId, serviceParams)
      }
    },
    [addServiceById, serviceId, servicesIdsSet, serviceParams, updateService],
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
