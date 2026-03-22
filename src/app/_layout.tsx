import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native'
import React from 'react'
import { useColorScheme } from 'react-native'
import AppTabs from '@/components/app-tabs'
import { StatusBar } from 'expo-status-bar'
import { I18nProvider } from '@/i18n'

export default function TabLayout() {
  const colorScheme = useColorScheme()
  return (
    <I18nProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <StatusBar style="auto" />
        <AppTabs />
      </ThemeProvider>
    </I18nProvider>
  )
}
