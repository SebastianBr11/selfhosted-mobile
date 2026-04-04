import { Button, Host, Text } from '@expo/ui/jetpack-compose'
import { fillMaxWidth, padding } from '@expo/ui/jetpack-compose/modifiers'
import { Trans, useLingui } from '@lingui/react/macro'
import { useQuery } from '@tanstack/react-query'
import { ScrollView, useColorScheme } from 'react-native'
import { TextInput } from '@/components/text-input'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { InlineInsetMedium } from '@/constants/theme'
import { useServicesUrl } from '../services/hooks/use-services-url'
import { remoteServicesQueryOptions } from '../services/lib/user-services.queries'
import Label from '@/components/label'

export default function RemoteSourceSettingsView() {
  const colorScheme = useColorScheme()
  const { errors, setUrl, url, urlFromEnv, valid: urlValid } = useServicesUrl()
  const { error, fetchStatus, isFetching, isSuccess, refetch } = useQuery(
    remoteServicesQueryOptions(url),
  )
  const { t } = useLingui()

  return (
    <ThemedView type="background">
      <ScrollView>
        <ThemedView style={{ gap: 16 }}>
          <ThemedView inlineInset style={{ gap: 8 }}>
            <Label>
              <Trans>Services URL </Trans>
              {urlFromEnv && (
                <ThemedText themeColor="textSecondary" type="small">
                  <Trans>(from environment)</Trans>
                </ThemedText>
              )}
            </Label>
            <TextInput
              editable={!urlFromEnv}
              keyboardType="url"
              onChangeText={setUrl}
              value={url}
            />
            {!urlValid ? <Label isError>{errors[0]}</Label> : null}
          </ThemedView>
          <ThemedView style={{ gap: 8 }}>
            <Host colorScheme={colorScheme} matchContents>
              <Button
                modifiers={[
                  fillMaxWidth(),
                  padding(InlineInsetMedium, 0, InlineInsetMedium, 0),
                ]}
                onClick={refetch}
              >
                <Text
                  style={{ typography: 'labelLarge' }}
                >{t`Test connection`}</Text>
              </Button>
            </Host>
            <ThemedView inlineInset>
              {isFetching ? (
                <ThemedText type="small">
                  <Trans>Connecting...</Trans>
                </ThemedText>
              ) : (
                <>
                  <ThemedText type={isSuccess ? 'success' : 'error'}>
                    {isSuccess ? t`Connected` : t`Not Connected`}
                  </ThemedText>
                  {fetchStatus === 'paused' && (
                    <ThemedText type="small">
                      <Trans>Connect to the Internet to fetch new data</Trans>
                    </ThemedText>
                  )}
                  {error && <Label isError>{error.message}</Label>}
                </>
              )}
            </ThemedView>
          </ThemedView>
        </ThemedView>
      </ScrollView>
    </ThemedView>
  )
}
