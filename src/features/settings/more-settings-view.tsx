import {
  Box,
  Column,
  Host,
  LazyColumn,
  Spacer,
  Text,
} from '@expo/ui/jetpack-compose'
import { height, padding } from '@expo/ui/jetpack-compose/modifiers'
import { t } from '@lingui/core/macro'
import * as Application from 'expo-application'
import * as Linking from 'expo-linking'
import { ListItem } from '@/components/jetpack-compose/list-item'
import { SwitchListItem } from '@/components/jetpack-compose/switch-list-item'
import { ThemedView } from '@/components/themed-view'
import { InlineInsetMedium } from '@/constants/theme'
import { useSettings } from '@/features/settings/hooks/use-settings'
import { useTheme } from '@/hooks/use-theme'

export default function MoreSettingsView() {
  const theme = useTheme()

  const {
    canSetOpenAppDirectly,
    canSetUseCupToCheckForUpdates,
    fetchServiceData,
    openAppDirectly,
    setFetchServiceData,
    setOpenAppDirectly,
    setShowAppStoreButton,
    setShowOpenInBrowserButton,
    setUseCupToCheckForUpdates,
    showAppStoreButton,
    showOpenInBrowserButton,
    useCupToCheckForUpdates,
  } = useSettings()

  return (
    <ThemedView>
      <Host matchContents>
        <LazyColumn
          modifiers={[padding(InlineInsetMedium, 0, InlineInsetMedium, 160)]} // Extra padding at the bottom, because the lazy column's height is too big
          verticalArrangement={{ spacedBy: 16 }}
        >
          <Spacer modifiers={[height(8)]} />
          <Column verticalArrangement={{ spacedBy: 2 }}>
            <Text
              color={theme.textPrimary.toString()}
            >{t`Service Details Fetching`}</Text>
            <Spacer modifiers={[height(8)]} />
            <SwitchListItem
              headline={t`Enable data fetching`}
              itemPosition="leading"
              leadingIcon={require('@/assets/symbols/cloud_download.xml')}
              onValueChange={setFetchServiceData}
              supportingText={t`Use service API to fetch service details`}
              value={fetchServiceData}
            />
            <SwitchListItem
              enabled={canSetUseCupToCheckForUpdates}
              headline={t`Use Cup to check for updates`}
              itemPosition="trailing"
              leadingIcon={require('@/assets/symbols/update.xml')}
              onValueChange={setUseCupToCheckForUpdates}
              supportingText={t`Use Cup (if available) to check for updates`}
              value={useCupToCheckForUpdates}
            />
          </Column>
          <Column verticalArrangement={{ spacedBy: 2 }}>
            <Text
              color={theme.textPrimary.toString()}
            >{t`Other settings`}</Text>
            <Spacer modifiers={[height(8)]} />
            <SwitchListItem
              headline={t`App Store button`}
              itemPosition="leading"
              leadingIcon={require('@/assets/symbols/store.xml')}
              onValueChange={setShowAppStoreButton}
              supportingText={t`Show App Store button`}
              value={showAppStoreButton}
            />
            <SwitchListItem
              headline={t`Open in browser button`}
              leadingIcon={require('@/assets/symbols/open_in_browser.xml')}
              onValueChange={setShowOpenInBrowserButton}
              supportingText={t`Show button to open in browser`}
              value={showOpenInBrowserButton}
            />
            <SwitchListItem
              enabled={canSetOpenAppDirectly}
              headline={t`Open app directly`}
              itemPosition="trailing"
              leadingIcon={require('@/assets/symbols/rocket_launch.xml')}
              onValueChange={setOpenAppDirectly}
              supportingText={t`Open app directly instead of bottom sheet. Only available if the app store button and open in browser button are hidden.`}
              value={openAppDirectly}
            />
          </Column>

          <Column verticalArrangement={{ spacedBy: 2 }}>
            <Text color={theme.textPrimary.toString()}>About</Text>
            <Spacer modifiers={[height(8)]} />

            <ListItem
              headline={t`Version`}
              itemPosition="leading"
              leadingIcon={require('@/assets/symbols/info.xml')}
              supportingText={
                Application.nativeApplicationVersion || t`Unknown version`
              }
            />
            <ListItem
              headline={t`Source Code`}
              leadingIcon={require('@/assets/symbols/code.xml')}
              onClick={() =>
                Linking.openURL(
                  'https://github.com/SebastianBr11/selfhosted-mobile',
                )
              }
              supportingText={t`View source code on GitHub`}
            />
            <ListItem
              headline={t`License`}
              itemPosition="trailing"
              leadingIcon={require('@/assets/symbols/license.xml')}
              onClick={() =>
                Linking.openURL(
                  'https://github.com/SebastianBr11/selfhosted-mobile/blob/main/LICENSE',
                )
              }
              supportingText={t`MIT`}
            />
          </Column>
          <Spacer modifiers={[height(8)]} />
        </LazyColumn>
      </Host>
    </ThemedView>
  )
}
