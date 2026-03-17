import { I18nProvider as BaseI18nProvider } from '@lingui/react'
import { i18n } from '@lingui/core'
import { ThemedText } from './components/themed-text'
export function I18nProvider({ children }: { children: React.ReactNode }) {
  return (
    <BaseI18nProvider i18n={i18n} defaultComponent={ThemedText}>
      {children}
    </BaseI18nProvider>
  )
}
