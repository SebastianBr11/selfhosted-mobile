import {
  Button,
  Column,
  Host,
  LazyColumn,
  Spacer,
  Text,
} from '@expo/ui/jetpack-compose'
import {
  fillMaxWidth,
  height,
  padding,
  paddingAll,
} from '@expo/ui/jetpack-compose/modifiers'
import { Trans, useLingui } from '@lingui/react/macro'
import { useQuery } from '@tanstack/react-query'
import * as Application from 'expo-application'
import { ScrollView, useColorScheme } from 'react-native'
import { ListItem } from '@/components/jetpack-compose/list-item'
import { SwitchListItem } from '@/components/jetpack-compose/switch-list-item'
import { TextInput } from '@/components/text-input'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { InlineInsetMedium } from '@/constants/theme'
import { useTheme } from '@/hooks/use-theme'
import { useServicesUrl } from '../services/hooks/use-services-url'
import { userServicesQueryOptions } from '../services/lib/user-services.queries'
import * as Linking from 'expo-linking'
import { useSettings } from './hooks/use-settings'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function SettingsView() {
  const theme = useTheme()
  const colorScheme = useColorScheme()
  const insets = useSafeAreaInsets()
  const { errors, setUrl, url, urlFromEnv, valid: urlValid } = useServicesUrl()
  const { error, fetchStatus, isFetching, isSuccess, refetch } = useQuery(
    userServicesQueryOptions(url),
  )
  const { t } = useLingui()
  const {
    canSetOpenAppDirectly,
    openAppDirectly,
    setOpenAppDirectly,
    setShowAppStoreButton,
    setShowOpenInBrowserButton,
    showAppStoreButton,
    showOpenInBrowserButton,
  } = useSettings()

  return (
    <ThemedView type="background" style={{ flex: 1, paddingTop: insets.top }}>
      <ScrollView>
        <Host colorScheme={colorScheme} matchContents>
          <Column modifiers={[paddingAll(InlineInsetMedium)]}>
            <Text
              color={theme.onSurface.toString()}
              style={{ typography: 'displayMedium' }}
            >
              {t`Settings`}
            </Text>
          </Column>
        </Host>

        <ThemedView style={{ gap: 16 }}>
          <ThemedView inlineInset style={{ gap: 8 }}>
            <ThemedText themeColor="textPrimary" type="label">
              <Trans>Services URL </Trans>
              {urlFromEnv && (
                <ThemedText themeColor="textSecondary" type="small">
                  <Trans>(from environment)</Trans>
                </ThemedText>
              )}
            </ThemedText>
            <TextInput
              editable={!urlFromEnv}
              keyboardType="url"
              onChangeText={setUrl}
              value={url}
            />
            {!urlValid ? (
              <ThemedText type="error">{errors[0]}</ThemedText>
            ) : null}
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
                  {error && (
                    <ThemedText type="error">{error.message}</ThemedText>
                  )}
                </>
              )}
            </ThemedView>
          </ThemedView>
        </ThemedView>
        <Host matchContents>
          <LazyColumn
            modifiers={[paddingAll(InlineInsetMedium)]}
            verticalArrangement={{ spacedBy: 16 }}
          >
            <Column verticalArrangement={{ spacedBy: 2 }}>
              <Text
                color={theme.textPrimary.toString()}
              >{t`Other settings`}</Text>
              <Spacer modifiers={[height(8)]} />
              <SwitchListItem
                headline={t`App Store button`}
                icon={require('@/assets/symbols/store.xml')}
                itemPosition="leading"
                onValueChange={setShowAppStoreButton}
                supportingText={t`Show App Store button`}
                value={showAppStoreButton}
              />
              <SwitchListItem
                headline={t`Open in browser button`}
                icon={require('@/assets/symbols/open_in_browser.xml')}
                onValueChange={setShowOpenInBrowserButton}
                supportingText={t`Show button to open in browser`}
                value={showOpenInBrowserButton}
              />
              <SwitchListItem
                enabled={canSetOpenAppDirectly}
                headline={t`Open app directly`}
                icon={require('@/assets/symbols/rocket_launch.xml')}
                onValueChange={setOpenAppDirectly}
                itemPosition="trailing"
                supportingText={t`Open app directly instead of bottom sheet. Only available if the app store button and open in browser button are hidden.`}
                value={openAppDirectly}
              />
            </Column>

            <Column verticalArrangement={{ spacedBy: 2 }}>
              <Text color={theme.textPrimary.toString()}>About</Text>
              <Spacer modifiers={[height(8)]} />

              <ListItem
                headline={t`Version`}
                icon={require('@/assets/symbols/info.xml')}
                itemPosition="leading"
                supportingText={
                  Application.nativeApplicationVersion || t`Unknown version`
                }
              />
              <ListItem
                headline={t`Source Code`}
                icon={require('@/assets/symbols/code.xml')}
                supportingText={t`View source code on GitHub`}
                onClick={() =>
                  Linking.openURL(
                    'https://github.com/SebastianBr11/selfhosted-mobile',
                  )
                }
              />
              <ListItem
                headline={t`License`}
                icon={require('@/assets/symbols/license.xml')}
                supportingText={t`MIT`}
                itemPosition="trailing"
                onClick={() =>
                  Linking.openURL(
                    'https://github.com/SebastianBr11/selfhosted-mobile/blob/main/LICENSE',
                  )
                }
              />
            </Column>
          </LazyColumn>
        </Host>
      </ScrollView>
    </ThemedView>
  )
}
