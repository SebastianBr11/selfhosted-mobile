import {
  Button,
  Column,
  FloatingActionButton,
  Host,
  Icon,
  Text,
} from '@expo/ui/jetpack-compose'
import {
  align,
  padding,
  wrapContentHeight,
} from '@expo/ui/jetpack-compose/modifiers'
import { Trans, useLingui } from '@lingui/react/macro'
import { BlurTargetView, BlurTint, BlurView } from 'expo-blur'
import { useRouter } from 'expo-router'
import { useRef, useState } from 'react'
import { FlatList, RefreshControl, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { InlineInsetMedium, InlineInsetSmall } from '@/constants/theme'
import { useColorScheme } from '@/hooks/use-color-scheme'
import { useTheme } from '@/hooks/use-theme'
import { FetchServicesErrorDialog } from './components/fetch-services-error-dialog'
import { OfflineDialog } from './components/offline-dialog'
import { ServicesViewItem } from './components/services-view-item'
import { useServices } from './hooks/use-services'

export default function ServicesView() {
  const { t } = useLingui()
  const router = useRouter()
  const scheme = useColorScheme()
  const theme = useTheme()
  const { fetchStatus, isFetching, refetch, remote, services } = useServices()
  const [showErrorAlert, setShowErrorAlert] = useState(false)
  const [showOfflineAlert, setShowOfflineAlert] = useState(false)

  const blurTargetRef = useRef<null | View>(null)
  const insets = useSafeAreaInsets()
  const blurTint: BlurTint =
    scheme === 'dark' ? 'systemChromeMaterialDark' : 'systemChromeMaterialLight'

  async function tryFetchServices() {
    if (!refetch) return

    if (fetchStatus === 'paused') {
      setShowOfflineAlert(true)
    }
    const { isError } = await refetch()
    if (isError) {
      setShowErrorAlert(true)
    }
  }

  if (services.length === 0) {
    return (
      <Host style={{ flex: 1 }}>
        <Column
          modifiers={[
            padding(InlineInsetMedium, insets.top, InlineInsetMedium, 0),
            wrapContentHeight(),
          ]}
          verticalArrangement={{ spacedBy: 24 }}
        >
          <Column verticalArrangement={{ spacedBy: 8 }}>
            <Text
              color={theme.onSurface.toString()}
              modifiers={[align('centerHorizontally')]}
              style={{
                fontWeight: '700',
                lineBreak: 'heading',
                lineHeight: 56,
                textAlign: 'center',
                typography: 'displayLarge',
              }}
            >{t`You have no services yet`}</Text>
            <Text
              color={theme.textSecondary.toString()}
              modifiers={[align('centerHorizontally')]}
              style={{
                lineBreak: 'heading',
                lineHeight: 32,
                textAlign: 'center',
                typography: 'headlineMedium',
              }}
            >
              {t`Go to settings to setup the URL`}
            </Text>
          </Column>
          <Button
            contentPadding={{ bottom: 16, end: 32, start: 32, top: 16 }}
            modifiers={[align('centerHorizontally')]}
            onClick={() => router.navigate('/settings')}
          >
            <Text
              style={{ fontSize: 24, fontWeight: '500' }}
            >{t`Setup URL`}</Text>
            <Icon
              modifiers={[padding(4, 0, 0, 0)]}
              source={require('@/assets/symbols/edit.xml')}
              tint={theme.backgroundPrimary}
            />
          </Button>
        </Column>
      </Host>
    )
  }

  return (
    <ThemedView style={{ flex: 1 }} type="background">
      <BlurTargetView ref={blurTargetRef}>
        <FlatList
          columnWrapperStyle={{ gap: 12 }}
          contentContainerStyle={{
            backgroundColor: theme.background,
            gap: 12,
            paddingInline: InlineInsetSmall,
            paddingVertical: 32,
          }}
          data={services}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={
            <ThemedText
              style={{ marginTop: 20, paddingVertical: 40 }}
              type="title"
            >
              <Trans>Your Services</Trans>
            </ThemedText>
          }
          numColumns={2}
          refreshControl={
            <RefreshControl
              enabled={remote}
              onRefresh={tryFetchServices}
              progressViewOffset={insets.top}
              refreshing={isFetching ?? false}
            />
          }
          renderItem={({ item }) => <ServicesViewItem service={item} />}
        />
      </BlurTargetView>
      {remote && (
        <View style={{ bottom: 16, position: 'absolute', right: 16 }}>
          <Host matchContents>
            <FloatingActionButton onClick={tryFetchServices}>
              <FloatingActionButton.Icon>
                <Icon
                  contentDescription="Sync Services"
                  source={require('@/assets/symbols/sync.xml')}
                  tint={theme.textPrimary}
                />
              </FloatingActionButton.Icon>
            </FloatingActionButton>
          </Host>
        </View>
      )}
      {showErrorAlert && (
        <FetchServicesErrorDialog hide={() => setShowErrorAlert(false)} />
      )}
      {showOfflineAlert && (
        <OfflineDialog hide={() => setShowOfflineAlert(false)} />
      )}
      <BlurView
        blurMethod="dimezisBlurViewSdk31Plus"
        blurTarget={blurTargetRef}
        intensity={20}
        style={{ height: insets.top, position: 'absolute', width: '100%' }}
        tint={blurTint}
      ></BlurView>
    </ThemedView>
  )
}
