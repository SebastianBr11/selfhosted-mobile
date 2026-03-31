import {
  Column,
  Host,
  LazyColumn,
  Spacer,
  Text,
} from '@expo/ui/jetpack-compose'
import { height, paddingAll } from '@expo/ui/jetpack-compose/modifiers'
import { t } from '@lingui/core/macro'
import * as Application from 'expo-application'
import * as Linking from 'expo-linking'
import { ListItem } from '@/components/jetpack-compose/list-item'
import { SwitchListItem } from '@/components/jetpack-compose/switch-list-item'
import { InlineInsetMedium } from '@/constants/theme'
import { useSettings } from '@/features/settings/hooks/use-settings'
import { useTheme } from '@/hooks/use-theme'

export default function MoreSettingsView() {
  const theme = useTheme()

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
    <Host matchContents>
      <LazyColumn
        modifiers={[paddingAll(InlineInsetMedium)]}
        verticalArrangement={{ spacedBy: 16 }}
      >
        <Column verticalArrangement={{ spacedBy: 2 }}>
          <Text color={theme.textPrimary.toString()}>{t`Other settings`}</Text>
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
      </LazyColumn>
    </Host>
  )
}
