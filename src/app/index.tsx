import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { useServices } from '@/hooks/use-services'
import { useServicesUrl } from '@/hooks/use-services-url'
import { FlatList, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function HomeScreen() {
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

  return (
    <ThemedView style={{ flex: 1 }} type="background">
      <SafeAreaView style={{ flex: 1 }}>
        <ThemedText type="title">Hi, url: {url}</ThemedText>
        <Pressable onPress={fetchServices}>
          <ThemedText>Fetch Services</ThemedText>
        </Pressable>
        <FlatList
          data={services}
          renderItem={({ item }) => <ThemedText>{item.url}</ThemedText>}
        />
        <ThemedText>{JSON.stringify(fetchState, null, 2)}</ThemedText>
      </SafeAreaView>
    </ThemedView>
  )
}
