import {
  AnimatedVisibility,
  Button,
  EnterTransition,
  ExitTransition,
  FilledTonalButton,
  Host,
  LinearWavyProgressIndicator,
  Text,
} from '@expo/ui/jetpack-compose'
import { fillMaxWidth, padding } from '@expo/ui/jetpack-compose/modifiers'
import { Trans, useLingui } from '@lingui/react/macro'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { ScrollView, useColorScheme } from 'react-native'
import Label from '@/components/label'
import { TextInput } from '@/components/text-input'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { InlineInsetMedium } from '@/constants/theme'
import { useServicesUrl } from '../services/hooks/use-services-url'
import { remoteServicesQueryOptions } from '../services/lib/user-services.queries'
import { ConvertToLocalSourceDialog } from './components/convert-to-local-source-dialog'

export default function RemoteSourceSettingsView() {
  const colorScheme = useColorScheme()
  const { errors, setUrl, url, urlFromEnv, valid: urlValid } = useServicesUrl()
  const { error, fetchStatus, isFetching, isSuccess, refetch } = useQuery(
    remoteServicesQueryOptions(url),
  )
  const { t } = useLingui()
  const [showConvertToLocalSourceDialog, setShowConvertToLocalSourceDialog] =
    useState(false)

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
            <ThemedView inlineInset style={{ height: 32 }}>
              <Host
                style={{
                  height: 16,
                  left: InlineInsetMedium,
                  marginBottom: 8,
                  position: 'absolute',
                  right: InlineInsetMedium,
                  width: '100%',
                }}
              >
                <AnimatedVisibility visible={isFetching}>
                  <LinearWavyProgressIndicator />
                </AnimatedVisibility>
              </Host>
              {fetchStatus !== 'fetching' && (
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
          <Host matchContents>
            <AnimatedVisibility
              enterTransition={EnterTransition.fadeIn()}
              exitTransition={ExitTransition.fadeOut()}
              visible={isSuccess}
            >
              <FilledTonalButton
                modifiers={[
                  fillMaxWidth(),
                  padding(InlineInsetMedium, 0, InlineInsetMedium, 0),
                ]}
                onClick={() => setShowConvertToLocalSourceDialog(true)}
              >
                <Text style={{ typography: 'labelLarge' }}>
                  {t`Convert to local services`}
                </Text>
              </FilledTonalButton>
            </AnimatedVisibility>
          </Host>
        </ThemedView>
      </ScrollView>
      {showConvertToLocalSourceDialog && (
        <ConvertToLocalSourceDialog
          hide={() => setShowConvertToLocalSourceDialog(false)}
        />
      )}
    </ThemedView>
  )
}
