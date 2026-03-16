import {
  Host,
  ModalBottomSheet,
  Button,
  Column,
  Text,
  FlowRow,
  Spacer,
} from '@expo/ui/jetpack-compose'
import { fillMaxWidth, padding } from '@expo/ui/jetpack-compose/modifiers'
import * as WebBrowser from 'expo-web-browser'
import * as IntentLauncher from 'expo-intent-launcher'
import { useService } from '@/hooks/use-services'
import { isArray } from '@/util/is-type'
import { ServiceId } from '@/lib/service.schema'
import { useEffect, useState } from 'react'

type ServiceBottomSheetProps = {
  hide: () => void
  serviceId: ServiceId
}
export default function ServiceBottomSheet({
  hide,
  serviceId,
}: ServiceBottomSheetProps) {
  const service = useService(serviceId)

  const [androidAppAvailable, setAndroidAppAvailable] = useState(false)

  useEffect(() => {
    async function updateAndroidAppAvailable(packageName: string) {
      try {
        setAndroidAppAvailable(
          Boolean(await IntentLauncher.getApplicationIconAsync(packageName)),
        )
      } catch {}
    }
    if (service?.packageName) {
      updateAndroidAppAvailable(service.packageName)
    }
  }, [service?.packageName])

  if (!service) {
    hide()
    return null
  }

  function openLink(url: string) {
    WebBrowser.openBrowserAsync(url)
  }

  function openApp(packageName: string) {
    IntentLauncher.openApplication(packageName)
  }

  console.log('service', service)
  return (
    <Host ignoreSafeAreaKeyboardInsets matchContents>
      <ModalBottomSheet onDismissRequest={hide}>
        <Column
          verticalArrangement={{ spacedBy: 32 }}
          modifiers={[padding(24, 0, 24, 24)]}
        >
          <Text
            style={{
              textAlign: 'center',
              lineHeight: 32,
              fontWeight: 'bold',
              fontSize: 32,
            }}
            modifiers={[fillMaxWidth()]}
          >
            {service.name}
          </Text>
          <FlowRow horizontalArrangement={{ spacedBy: 12 }}>
            <Button
              onPress={() => openLink(service.url)}
              modifiers={[fillMaxWidth()]}
            >
              Open in Browser
            </Button>

            {androidAppAvailable && service.packageName && (
              <>
                <Spacer modifiers={[padding(0, 6, 0, 6)]} />
                <Button
                  onPress={() => openApp(service.packageName!)}
                  modifiers={[fillMaxWidth()]}
                >
                  Open installed App
                </Button>
              </>
            )}
            {service.appStoreLink &&
              (isArray(service.appStoreLink) ? (
                service.appStoreLink.map(({ name, url }) => (
                  <Column key={name}>
                    <Spacer modifiers={[padding(0, 6, 0, 6)]} />
                    <Button
                      variant="outlined"
                      onPress={() => openLink(url)}
                      modifiers={[fillMaxWidth()]}
                    >
                      Open in {name}
                    </Button>
                  </Column>
                ))
              ) : (
                <>
                  <Spacer modifiers={[padding(0, 6, 0, 6)]} />
                  <Button
                    variant="outlined"
                    onPress={() => openLink(service.appStoreLink as string)}
                    modifiers={[fillMaxWidth()]}
                  >
                    Open in App Store
                  </Button>
                </>
              ))}
          </FlowRow>
        </Column>
      </ModalBottomSheet>
    </Host>
  )
}
