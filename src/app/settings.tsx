import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TextInput } from '@/components/text-input'
import { useServicesUrl } from '@/hooks/use-services-url'
import Button from '@/components/button'
import { useServices } from '@/hooks/use-services'

export default function SettingsScreen() {
  const { url, setUrl, urlFromEnv, valid, errors } = useServicesUrl()
  const { fetchServices, fetchState } = useServices(url || '')

  return (
    <ThemedView style={{ flex: 1 }} inlineInset type="background">
      <SafeAreaView style={{ flex: 1 }}>
        <ThemedView style={{ flex: 1, justifyContent: 'center' }}>
          <ThemedText type="title">Settings</ThemedText>
        </ThemedView>
        <ThemedView style={{ flex: 1, gap: 32 }}>
          <ThemedView style={{ gap: 8 }}>
            <ThemedText type="label">
              Services URL{' '}
              {urlFromEnv && (
                <ThemedText type="small" themeColor="textSecondary">
                  (from environment)
                </ThemedText>
              )}
            </ThemedText>
            <TextInput
              value={url}
              onChangeText={setUrl}
              editable={!urlFromEnv}
            />
            {!valid && <ThemedText type="error">{errors[0]}</ThemedText>}
          </ThemedView>
          <ThemedView style={{ gap: 8 }}>
            <Button onPress={fetchServices}>Test connection</Button>
            {fetchState.didFetch &&
              (fetchState.fetching ? (
                <ThemedText type="default">Connecting...</ThemedText>
              ) : (
                <>
                  <ThemedText type={fetchState.success ? 'success' : 'error'}>
                    {fetchState.success ? 'Connected' : 'Not Connected'}
                  </ThemedText>
                  {!fetchState.success &&
                    fetchState.errors.map((error) => (
                      <ThemedText type="error" key={error}>
                        {error}
                      </ThemedText>
                    ))}
                </>
              ))}
          </ThemedView>
        </ThemedView>
      </SafeAreaView>
    </ThemedView>
  )
}
