import { Button, Host } from '@expo/ui/jetpack-compose'
import { fillMaxWidth, padding } from '@expo/ui/jetpack-compose/modifiers'
import { Trans, useLingui } from '@lingui/react/macro'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TextInput } from '@/components/text-input'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { InlineInsetMedium } from '@/constants/theme'
import { useServices } from '@/hooks/use-services'
import { useServicesUrl } from '@/hooks/use-services-url'

export default function SettingsView() {
  const { errors, setUrl, url, urlFromEnv, valid } = useServicesUrl()
  const { fetchServices, fetchState } = useServices(url || '')
  const { t } = useLingui()

  return (
    <ThemedView style={{ flex: 1 }} type="background">
      <SafeAreaView style={{ flex: 1 }}>
        <ThemedView style={{ flex: 1, justifyContent: 'center' }}>
          <ThemedText type="title">
            <Trans>Settings</Trans>
          </ThemedText>
        </ThemedView>
        <ThemedView style={{ flex: 1, gap: 24 }}>
          <ThemedView inlineInset style={{ gap: 8 }}>
            <ThemedText type="label">
              <Trans>Services URL </Trans>
              {urlFromEnv && (
                <ThemedText themeColor="textSecondary" type="small">
                  <Trans>(from environment)</Trans>
                </ThemedText>
              )}
            </ThemedText>
            <TextInput
              editable={!urlFromEnv}
              onChangeText={setUrl}
              value={url}
            />
            {!valid && <ThemedText type="error">{errors[0]}</ThemedText>}
          </ThemedView>
          <ThemedView style={{ gap: 8 }}>
            <Host matchContents>
              <Button
                modifiers={[
                  fillMaxWidth(),
                  padding(InlineInsetMedium, 0, InlineInsetMedium, 0),
                ]}
                onPress={fetchServices}
              >
                {t`Test connection`}
              </Button>
            </Host>
            <ThemedView inlineInset>
              {fetchState.didFetch &&
                (fetchState.fetching ? (
                  <ThemedText type="default">
                    <Trans>Connecting...</Trans>
                  </ThemedText>
                ) : (
                  <>
                    <ThemedText type={fetchState.success ? 'success' : 'error'}>
                      {fetchState.success ? t`Connected` : t`Not Connected`}
                    </ThemedText>
                    {!fetchState.success &&
                      fetchState.errors.map((error) => (
                        <ThemedText key={error} type="error">
                          {error}
                        </ThemedText>
                      ))}
                  </>
                ))}
            </ThemedView>
          </ThemedView>
        </ThemedView>
      </SafeAreaView>
    </ThemedView>
  )
}
