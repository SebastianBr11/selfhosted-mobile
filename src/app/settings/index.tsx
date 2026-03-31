import { Redirect } from 'expo-router'
import { useSettings } from '@/features/settings/hooks/use-settings'

export default function SettingsRedirectScreen() {
  const { useLocalSource } = useSettings()
  if (useLocalSource) {
    return <Redirect href="/settings/(services-source)/local-source-settings" />
  }
  return <Redirect href="/settings/(services-source)/remote-source-settings" />
}
