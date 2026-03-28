import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { useColorScheme } from 'react-native'
import AppTabs from '@/components/app-tabs'
import { initNetwork } from '@/features/app-init/init-network'
import { I18nProvider } from '@/i18n'
import { PersistentQueryClientProvider } from '@/persistent-query-client'

SplashScreen.preventAutoHideAsync()

export default function TabLayout() {
  const [isReady, setIsReady] = useState(false)
  const colorScheme = useColorScheme()

  useEffect(() => {
    async function initializeApp() {
      try {
        await initNetwork()
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
