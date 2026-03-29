import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react'
import AppTabs from '@/components/app-tabs'
import { initI18n } from '@/features/app-init/init-i18n'
import { initNetwork } from '@/features/app-init/init-network'
import { useColorScheme } from '@/hooks/use-color-scheme'
import { I18nProvider } from '@/i18n'
import { PersistentQueryClientProvider } from '@/persistent-query-client'

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false)
  const colorScheme = useColorScheme()

  useEffect(() => {
    async function initializeApp() {
      try {
        await initNetwork()
        await initI18n()
      } catch (e) {
        console.warn(e)
      } finally {
        setIsReady(true)
      }
    }

    initializeApp()
  }, [])

  useEffect(() => {
    if (isReady) {
      SplashScreen.hide()
    }
  }, [isReady])

  if (!isReady) {
    return null
  }

  return (
    <I18nProvider>
      <PersistentQueryClientProvider>
        <ThemeProvider
          value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
        >
          <StatusBar style="auto" />
          <AppTabs />
        </ThemeProvider>
      </PersistentQueryClientProvider>
    </I18nProvider>
  )
}
