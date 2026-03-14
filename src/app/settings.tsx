import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react'
import { TextInput } from '@/components/text-input'
import * as v from 'valibot'

const urlSchema = v.pipe(
  v.string(),
  v.nonEmpty('The URL is required'),
  v.url('The URL is invalid'),
)

export default function HomeScreen() {
  const url = process.env.EXPO_PUBLIC_SERVICES_URL
  const [value, setValue] = useState(url)
  const result = v.safeParse(urlSchema, value)
  return (
    <ThemedView style={{ flex: 1 }} type="background">
      <SafeAreaView style={{ flex: 1 }}>
        <ThemedView style={{ flex: 1, justifyContent: 'center' }}>
          <ThemedText type="title">Settings</ThemedText>
        </ThemedView>
        <ThemedView style={{ flex: 1, gap: 8 }}>
          <ThemedText type="label">Services URL</ThemedText>
          <TextInput value={value} onChangeText={setValue} editable={!url} />
          {result.issues?.length && (
            <ThemedText type="error">{result.issues[0].message}</ThemedText>
          )}
        </ThemedView>
      </SafeAreaView>
    </ThemedView>
  )
}
