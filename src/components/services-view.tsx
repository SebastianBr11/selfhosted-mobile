import { ThemedText } from '@/components/themed-text'
import { Trans, useLingui } from '@lingui/react/macro'
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
import { Button, Host } from '@expo/ui/jetpack-compose'
import {
  fillMaxWidth,
  height,
  padding,
} from '@expo/ui/jetpack-compose/modifiers'
import { InlineInsetSmall } from '@/constants/theme'

export default function ServicesView() {
  const scheme = useColorScheme()
  const { t } = useLingui()
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
      <SafeAreaView style={{ flex: 1, gap: 20, paddingTop: 40 }}>
        <FlatList
          ListHeaderComponent={
            <ThemedText style={{ paddingVertical: 20 }} type="title">
              <Trans>Your Services</Trans>
            </ThemedText>
          }
          data={services}
          numColumns={2}
          refreshing={fetchState.didFetch && fetchState.fetching}
          onRefresh={fetchServices}
          columnWrapperStyle={{ gap: 12 }}
          style={{ marginInline: InlineInsetSmall }}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            gap: 12,
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
        <Host matchContents>
          <Button
            modifiers={[
              fillMaxWidth(),
              padding(InlineInsetSmall, 0, InlineInsetSmall, 0),
              height(48),
            ]}
            onPress={fetchServices}
          >
            {t`Fetch services`}
          </Button>
        </Host>
      </SafeAreaView>
      {selectedServiceId && (
        <ServiceBottomSheet
          hide={() => setSelectedServiceId(null)}
          serviceId={selectedServiceId}
        />
      )}
    </ThemedView>
  )
}
