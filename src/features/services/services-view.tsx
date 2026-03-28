import {
  Button,
  FloatingActionButton,
  Host,
  Icon,
  Text,
} from '@expo/ui/jetpack-compose'
import { padding } from '@expo/ui/jetpack-compose/modifiers'
import { Trans } from '@lingui/react/macro'
import { useQuery } from '@tanstack/react-query'
import { BlurTargetView, BlurTint, BlurView } from 'expo-blur'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import { useRef, useState } from 'react'
import { FlatList, Pressable, RefreshControl, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { InlineInsetSmall } from '@/constants/theme'
import { schemeDependantIcon } from '@/features/services/util'
import { useColorScheme } from '@/hooks/use-color-scheme'
import { useTheme } from '@/hooks/use-theme'
import { FetchServicesErrorDialog } from './fetch-services-error-dialog'
import { useServicesUrl } from './hooks/use-services-url'
import { userServicesQueryKey } from './lib/user-services.queries'
import { OfflineDialog } from './offline-dialog'
import ServiceBottomSheet from './service-bottom-sheet'

export default function ServicesView() {
  const router = useRouter()
  const scheme = useColorScheme()
  const theme = useTheme()
  const { deferredUrl, valid } = useServicesUrl()
  const {
    data: services = [],
    fetchStatus,
    isFetching,
    refetch,
  } = useQuery(userServicesQueryKey(deferredUrl))
  const [selectedServiceId, setSelectedServiceId] = useState<null | string>(
    null,
  )
  const [showErrorAlert, setShowErrorAlert] = useState(false)
  const [showOfflineAlert, setShowOfflineAlert] = useState(false)

  const blurTargetRef = useRef<null | View>(null)
  const insets = useSafeAreaInsets()
  const blurTint: BlurTint =
    scheme === 'dark' ? 'systemChromeMaterialDark' : 'systemChromeMaterialLight'

  async function tryFetchServices() {
    if (fetchStatus === 'paused') {
      setShowOfflineAlert(true)
    }
    const { isError } = await refetch()
    if (isError) {
      setShowErrorAlert(true)
    }
  }

  if (services.length === 0 || !valid) {
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
              refreshing={isFetching}
            />
          }
          renderItem={({ item }) => (
            <Pressable
              onPress={() => setSelectedServiceId(item.id)}
              style={{ flex: 1 }}
            >
              <ThemedView
                style={{
                  alignItems: 'center',
                  borderRadius: 8,
                  gap: 8,
                  padding: 16,
                  paddingInline: 12,
                }}
                type="backgroundElement"
              >
                <ThemedView
                  style={{ aspectRatio: 1, height: 50 }}
                  type="backgroundElement"
                >
                  <Image
                    contentFit="cover"
                    source={schemeDependantIcon(scheme, item.iconUrl)}
                    style={{ flex: 1, width: '100%' }}
                  />
                </ThemedView>
                <ThemedView
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    gap: 6,
                    justifyContent: 'space-around',
                    marginInline: 18,
                  }}
                  type="backgroundElement"
                >
                  <ThemedText style={{ textAlign: 'center' }} type="large">
                    {item.name}
                  </ThemedText>
                </ThemedView>
                <ThemedText
                  style={{ textAlign: 'center' }}
                  themeColor="textSecondary"
                  type="small"
                >
                  {item.description}
                </ThemedText>
              </ThemedView>
            </Pressable>
          )}
        />
      </BlurTargetView>
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
      {showErrorAlert && (
        <FetchServicesErrorDialog hide={() => setShowErrorAlert(false)} />
      )}
      {showOfflineAlert && (
        <OfflineDialog hide={() => setShowOfflineAlert(false)} />
      )}
      {selectedServiceId && (
        <ServiceBottomSheet
          hide={() => setSelectedServiceId(null)}
          serviceId={selectedServiceId}
        />
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
