import {
  Button,
  FloatingActionButton,
  Host,
  Icon,
  Text,
} from '@expo/ui/jetpack-compose'
import { padding } from '@expo/ui/jetpack-compose/modifiers'
import { Trans } from '@lingui/react/macro'
import { BlurTargetView, BlurTint, BlurView } from 'expo-blur'
import { useRouter } from 'expo-router'
import { useRef, useState } from 'react'
import { FlatList, RefreshControl, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { InlineInsetSmall } from '@/constants/theme'
import { useColorScheme } from '@/hooks/use-color-scheme'
import { useTheme } from '@/hooks/use-theme'
import { ServicesViewItem } from './components/services-view-item'
import { FetchServicesErrorDialog } from './fetch-services-error-dialog'
import { useServices } from './hooks/use-services'
import { OfflineDialog } from './offline-dialog'

export default function ServicesView() {
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
      <ThemedView
        inlineInset
        style={{
          alignItems: 'center',
          flex: 1,
          gap: 24,
          justifyContent: 'center',
          paddingTop: insets.top,
        }}
      >
        <ThemedView style={{ alignItems: 'center', gap: 16 }}>
          <ThemedText type="title">
            <Trans>You have no services yet</Trans>
          </ThemedText>
          <ThemedText
            style={{
              color: theme.textSecondary,
              fontWeight: '500',
              justifyContent: 'center',
              textAlign: 'center',
            }}
            type="large"
          >
            <Trans>Go to settings to setup the URL</Trans>
          </ThemedText>
        </ThemedView>
        <Host matchContents>
          <Button
            contentPadding={{ bottom: 16, end: 32, start: 32, top: 16 }}
            onClick={() => router.navigate('/settings')}
          >
            <Text style={{ fontSize: 24, fontWeight: '500' }}>Setup URL</Text>
            <Icon
              modifiers={[padding(4, 0, 0, 0)]}
              source={require('@/assets/symbols/edit.xml')}
              tintColor={theme.backgroundPrimary}
            />
          </Button>
        </Host>
      </ThemedView>
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
                  tintColor={theme.textPrimary}
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
