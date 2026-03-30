import { Image } from 'expo-image'
import { Link } from 'expo-router'
import { useColorScheme } from 'react-native'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { useSettings } from '@/features/settings/hooks/use-settings'
import { useInstalledApp } from '../hooks/use-installed-app'
import { Service } from '../lib/service.schema'
import { schemeDependantIcon } from '../util'

type ServicesViewItemProps = {
  service: Service
}
export function ServicesViewItem({ service }: ServicesViewItemProps) {
  const colorScheme = useColorScheme()
  const { openAppDirectly } = useSettings()
  const { appAvailable, openApp } = useInstalledApp(service.packageName)

  return (
    <Link
      href={{
        params: { serviceId: service.id },
        pathname: '/services/[serviceId]',
      }}
      onPress={(e) => {
        if (openAppDirectly && appAvailable) {
          e.preventDefault()
          openApp()
        }
      }}
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
            source={schemeDependantIcon(colorScheme, service.iconUrl)}
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
            {service.name}
          </ThemedText>
        </ThemedView>
        <ThemedText
          style={{ textAlign: 'center' }}
          themeColor="textSecondary"
          type="small"
        >
          {service.description}
        </ThemedText>
      </ThemedView>
    </Link>
  )
}
