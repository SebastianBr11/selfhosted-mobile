import { i18n, Messages } from '@lingui/core'
import { I18nProvider as BaseI18nProvider } from '@lingui/react'
import { useLocales } from 'expo-localization'
import { useEffect } from 'react'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const availableLocales = ['en', 'de', 'es'] as const
type AvailableLocale = (typeof availableLocales)[number]
const fallbackLocale: AvailableLocale = 'en'

async function loadAndActivateLocale(locale: AvailableLocale | (string & {})) {
  let messages: Messages
  switch (locale) {
    case 'de':
      messages = (await import('@/locales/de/messages')).messages
      break
    case 'es':
      messages = (await import('@/locales/es/messages')).messages
      break
    case 'en':
    default:
      messages = (await import('@/locales/en/messages')).messages
      break
  }

  i18n.loadAndActivate({
    locale,
    messages: messages,
  })
}
loadAndActivateLocale(fallbackLocale)

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const locales = useLocales()
  useEffect(() => {
    loadAndActivateLocale(locales[0].languageCode || fallbackLocale)
  }, [locales])
  return <BaseI18nProvider i18n={i18n}>{children}</BaseI18nProvider>
}
