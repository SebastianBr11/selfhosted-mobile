import Button from '@/components/button'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { useServices } from '@/hooks/use-services'
import { useServicesUrl } from '@/hooks/use-services-url'
import { Image } from 'expo-image'
import { Link } from 'expo-router'
import { FlatList, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Feather from '@expo/vector-icons/Feather'
import { useTheme } from '@/hooks/use-theme'

export default function HomeScreen() {
  const theme = useTheme()
  const { url, valid } = useServicesUrl()
  const { services, fetchState, fetchServices } = useServices(url || '')

  if (!valid) {
    return (
      <ThemedView style={{ flex: 1 }} type="background">
        <SafeAreaView style={{ flex: 1 }}>
          <ThemedText type="title">Go to settings to setup the URL</ThemedText>
        </SafeAreaView>
      </ThemedView>
    )
  }
  console.log('services', services)

  return (
    <ThemedView style={{ flex: 1 }} type="background">
      <SafeAreaView style={{ flex: 1, gap: 20 }}>
        <ThemedText type="title">Here are your services</ThemedText>
        <FlatList
          data={services}
          keyExtractor={(item) => item.id}
          columnWrapperStyle={{
            gap: 16,
          }}
          contentContainerStyle={{
            flex: 1,
            paddingInline: 20,
          }}
          renderItem={({ item }) => (
            <Link href={`${item.url}/`} asChild>
              <Pressable style={{ flex: 1, flexShrink: 1 }}>
                <ThemedView
                  type="backgroundElement"
                  style={{
                    borderRadius: 8,
                    padding: 16,
                    paddingInline: 12,
                    gap: 12,
                    alignItems: 'center',
                  }}
                >
                  <ThemedView
                    type="backgroundElement"
                    style={{ height: 50, aspectRatio: 1 }}
                  >
                    <Image
                      contentFit="cover"
                      source={item.iconUrl}
                      style={{ flex: 1, width: '100%' }}
                    />
                  </ThemedView>
                  <ThemedView
                    type="backgroundElement"
                    style={{
                      flexDirection: 'row',
                      gap: 8,
                      alignItems: 'center',
                      maxWidth: 100,
                    }}
                  >
                    <ThemedText type="large">{item.title}</ThemedText>
                    <Feather
                      name="external-link"
                      size={20}
                      color={theme.textSecondary}
                    />
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
            </Link>
          )}
          ListFooterComponent={
            <Button
              loading={fetchState.didFetch && fetchState.fetching}
              onPress={fetchServices}
            >
              Fetch services
            </Button>
          }
          ListFooterComponentStyle={{ marginTop: 'auto' }}
        />
      </SafeAreaView>
    </ThemedView>
  )
}
