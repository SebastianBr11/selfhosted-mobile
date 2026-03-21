import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useServicesUrl } from '@/hooks/use-services-url'
import { useServices } from '@/hooks/use-services'
import { TextInput } from '@/components/text-input'
import { Button, Host, Text } from '@expo/ui/jetpack-compose'
import { fillMaxWidth, padding } from '@expo/ui/jetpack-compose/modifiers'
import { InlineInsetMedium } from '@/constants/theme'
import { Trans, useLingui } from '@lingui/react/macro'

export default function SettingsScreen() {
  const { url, setUrl, urlFromEnv, valid, errors } = useServicesUrl()
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
                <ThemedText type="small" themeColor="textSecondary">
                  <Trans>(from environment)</Trans>
                </ThemedText>
              )}
            </ThemedText>
            <TextInput
              value={url}
              onChangeText={setUrl}
              editable={!urlFromEnv}
            />
            {!valid && <ThemedText type="error">{errors[0]}</ThemedText>}
          </ThemedView>
          <ThemedView style={{ gap: 8 }}>
            <Host matchContents>
              <Button
                onPress={fetchServices}
                modifiers={[
                  fillMaxWidth(),
                  padding(InlineInsetMedium, 0, InlineInsetMedium, 0),
                ]}
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
                        <ThemedText type="error" key={error}>
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
