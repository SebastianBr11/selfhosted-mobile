import { ThemedText } from '@/components/themed-text'
import { Trans } from '@lingui/react/macro'
import { ThemedView } from '@/components/themed-view'
import { useServices } from '@/hooks/use-services'
import { useServicesUrl } from '@/hooks/use-services-url'
import { Image } from 'expo-image'
import { FlatList, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { schemeDependantIcon } from '@/util/theme-util'
import { useColorScheme } from '@/hooks/use-color-scheme'
import { useState } from 'react'
import ServiceBottomSheet from './service-bottom-sheet'
import {
  HorizontalFloatingToolbar,
  Host,
  Icon,
  IconButton,
} from '@expo/ui/jetpack-compose'
import { align, paddingAll } from '@expo/ui/jetpack-compose/modifiers'
import { InlineInsetSmall } from '@/constants/theme'
import { useTheme } from '@/hooks/use-theme'

export default function ServicesView() {
  const scheme = useColorScheme()
  const theme = useTheme()
  const { url, valid } = useServicesUrl()
  const { services, fetchState, fetchServices } = useServices(url || '')
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(
    null,
  )

  if (!valid) {
    return (
      <ThemedView style={{ flex: 1 }} type="background">
        <SafeAreaView
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <ThemedText type="title">
            <Trans>Go to settings to setup the URL</Trans>
          </ThemedText>
        </SafeAreaView>
      </ThemedView>
    )
  }

  return (
    <ThemedView style={{ flex: 1 }} type="background">
      <FlatList
        ListHeaderComponent={
          <ThemedText
            style={{ paddingVertical: 40, marginTop: 20 }}
            type="title"
          >
            <Trans>Your Services</Trans>
          </ThemedText>
        }
        data={services}
        numColumns={2}
        refreshing={fetchState.didFetch && fetchState.fetching}
        onRefresh={fetchServices}
        columnWrapperStyle={{ gap: 12 }}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          gap: 12,
          marginInline: InlineInsetSmall,
          paddingVertical: 32,
        }}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => setSelectedServiceId(item.id)}
            style={{ flex: 1 }}
          >
            <ThemedView
              type="backgroundElement"
              style={{
                borderRadius: 8,
                padding: 16,
                paddingInline: 12,
                gap: 8,
                alignItems: 'center',
              }}
            >
              <ThemedView
                type="backgroundElement"
                style={{ height: 50, aspectRatio: 1 }}
              >
                <Image
                  contentFit="cover"
                  source={schemeDependantIcon(scheme, item.iconUrl)}
                  style={{ flex: 1, width: '100%' }}
                />
              </ThemedView>
              <ThemedView
                type="backgroundElement"
                style={{
                  flexDirection: 'row',
                  gap: 6,
                  alignItems: 'center',
                  justifyContent: 'space-around',
                  marginInline: 18,
                }}
              >
                <ThemedText style={{ textAlign: 'center' }} type="large">
                  {item.name}
                </ThemedText>
              </ThemedView>
              <ThemedText
                type="small"
                style={{ textAlign: 'center' }}
                themeColor="textSecondary"
              >
                {item.description}
              </ThemedText>
            </ThemedView>
          </Pressable>
        )}
      />
      <Host
        style={{
          position: 'absolute',
          alignSelf: 'flex-end',
          bottom: 0,
        }}
        matchContents
      >
        <HorizontalFloatingToolbar
          variant="vibrant"
          modifiers={[align('bottomEnd'), paddingAll(16)]}
        >
          <IconButton onPress={fetchServices}>
            <Icon
              source={require('@/assets/symbols/sync.xml')}
              contentDescription="Sync Services"
              tintColor={theme.textPrimary}
            />
          </IconButton>
        </HorizontalFloatingToolbar>
      </Host>
      {selectedServiceId && (
        <ServiceBottomSheet
          hide={() => setSelectedServiceId(null)}
          serviceId={selectedServiceId}
        />
      )}
    </ThemedView>
  )
}
