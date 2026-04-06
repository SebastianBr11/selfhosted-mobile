import { Redirect, useLocalSearchParams } from 'expo-router'
import { useServicesUrl } from '@/features/services/hooks/use-services-url'
import { useSettings } from '@/features/settings/hooks/use-settings'

export default function SettingsRedirectScreen() {
  const { serviceUrl } = useLocalSearchParams<{ serviceUrl?: string }>()
  const { useLocalSource } = useSettings()
  const { setUrl } = useServicesUrl()

  if (serviceUrl) {
    setUrl(serviceUrl)

    return (
      <Redirect href="/settings/(services-source)/remote-source-settings" />
    )
  }

  if (useLocalSource) {
    return <Redirect href="/settings/(services-source)/local-source-settings" />
  }
  return <Redirect href="/settings/(services-source)/remote-source-settings" />
}
