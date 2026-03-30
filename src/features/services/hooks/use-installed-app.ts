import * as IntentLauncher from 'expo-intent-launcher'
import { useEffect, useState } from 'react'

export function useInstalledApp(packageName?: string) {
  const [appAvailable, setAppAvailable] = useState(false)
  useEffect(() => {
    async function updateAndroidAppAvailable(packageName: string) {
      try {
        setAppAvailable(
          Boolean(await IntentLauncher.getApplicationIconAsync(packageName)),
        )
      } catch {}
    }
    if (packageName) {
      updateAndroidAppAvailable(packageName)
    }
  }, [packageName])

  function openApp() {
    if (!packageName) return
    IntentLauncher.openApplication(packageName)
  }

  return {
    appAvailable,
    openApp,
  }
}
