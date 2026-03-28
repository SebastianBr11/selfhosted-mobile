import { getLocales } from 'expo-localization'
import { loadAndActivateLocale } from '@/i18n'

export async function initI18n() {
  const locale = getLocales()[0].languageCode || 'en'
  await loadAndActivateLocale(locale)
}
