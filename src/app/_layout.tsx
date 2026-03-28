import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native'
import { onlineManager } from '@tanstack/react-query'
import * as Network from 'expo-network'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { useColorScheme } from 'react-native'
import AppTabs from '@/components/app-tabs'
import { I18nProvider } from '@/i18n'
import { PersistentQueryClientProvider } from '@/persistent-query-client'

onlineManager.setEventListener((setOnline) => {
  const listener = Network.addNetworkStateListener((event) => {
    setOnline(!!event.isInternetReachable)
  })
  return listener.remove
})

export default function TabLayout() {
  const colorScheme = useColorScheme()
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
