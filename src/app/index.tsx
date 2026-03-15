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
import { schemeDependantIcon } from '@/util/theme-util'
import { useColorScheme } from '@/hooks/use-color-scheme'

export default function HomeScreen() {
  const scheme = useColorScheme()
  const theme = useTheme()
  const { url, valid } = useServicesUrl()
  const { services, fetchState, fetchServices } = useServices(url || '')

  if (!valid) {
    return (
      <ThemedView style={{ flex: 1 }} type="background">
        <SafeAreaView
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <ThemedText type="title">Go to settings to setup the URL</ThemedText>
        </SafeAreaView>
      </ThemedView>
    )
  }

  return (
    <ThemedView style={{ flex: 1 }} type="background">
      <SafeAreaView style={{ flex: 1, gap: 20 }}>
        <ThemedText type="title">Here are your services</ThemedText>
        <FlatList
          data={services}
          numColumns={2}
          refreshing={fetchState.didFetch && fetchState.fetching}
          onRefresh={fetchServices}
          columnWrapperStyle={{ gap: 12 }}
          style={{ marginInline: 20 }}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            gap: 12,
          }}
          renderItem={({ item }) => (
            <Link href={`${item.url}/`} asChild>
              <Pressable style={{ flex: 1 }}>
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
                      {item.title}
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
            </Link>
          )}
        />

        <Button
          loading={fetchState.didFetch && fetchState.fetching}
          onPress={fetchServices}
          style={{ marginInline: 20 }}
        >
          Fetch services
        </Button>
      </SafeAreaView>
    </ThemedView>
  )
}
