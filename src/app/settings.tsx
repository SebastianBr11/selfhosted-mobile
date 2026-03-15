import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useEffect, useState } from 'react'
import { TextInput } from '@/components/text-input'
import { Pressable } from 'react-native'
import { useTheme } from '@/hooks/use-theme'
import { useServicesUrl } from '@/hooks/use-services-url'

export default function SettingsScreen() {
  const theme = useTheme()
  const { url, setUrl, urlFromEnv, valid, errors } = useServicesUrl()
  useEffect(() => {
    if (urlFromEnv) {
      setUrl(process.env.EXPO_PUBLIC_SERVICES_URL)
    }
  }, [])
  const [connectionStatus, setConnectionStatus] = useState<
    { success: boolean; connecting: false } | { connecting: true } | undefined
  >()

  async function connect() {
    setConnectionStatus({ connecting: true })
    await new Promise((resolve) => setTimeout(resolve, 500))
    setConnectionStatus({ success: Math.random() > 0.5, connecting: false })
  }
  console.log('input disabled', urlFromEnv)

  return (
    <ThemedView style={{ flex: 1 }} type="background">
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
            <Pressable
              style={{
                padding: 16,
                backgroundColor: theme.backgroundPrimary,
                borderRadius: 8,
              }}
              onPress={connect}
            >
              <ThemedText type="button" themeColor="textPrimary">
                Test Connection
              </ThemedText>
            </Pressable>
            {connectionStatus !== undefined &&
              (connectionStatus.connecting ? (
                <ThemedText type="default">Connecting...</ThemedText>
              ) : (
                <ThemedText
                  type={connectionStatus.success ? 'success' : 'error'}
                >
                  {connectionStatus.success ? 'Connected' : 'Not Connected'}
                </ThemedText>
              ))}
          </ThemedView>
        </ThemedView>
      </SafeAreaView>
    </ThemedView>
  )
}
