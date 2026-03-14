import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function HomeScreen() {
  const url = process.env.EXPO_PUBLIC_SERVICES_URL
  return (
    <ThemedView style={{ flex: 1 }} type="background">
      <SafeAreaView style={{ flex: 1 }}>
        <ThemedText type="title">Hi, url: {url}</ThemedText>
      </SafeAreaView>
    </ThemedView>
  )
}
