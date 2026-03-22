import {
  Button,
  Column,
  FlowRow,
  Host,
  ModalBottomSheet,
  Spacer,
  Text,
} from '@expo/ui/jetpack-compose'
import { fillMaxWidth, padding } from '@expo/ui/jetpack-compose/modifiers'
import { Trans, useLingui } from '@lingui/react/macro'
import * as IntentLauncher from 'expo-intent-launcher'
import * as WebBrowser from 'expo-web-browser'
import { useEffect, useState } from 'react'
import { useService } from '@/hooks/use-services'
import { ServiceId } from '@/lib/service.schema'
import { isArray } from '@/util/is-type'

type ServiceBottomSheetProps = {
  hide: () => void
  serviceId: ServiceId
}
export default function ServiceBottomSheet({
  hide,
  serviceId,
}: ServiceBottomSheetProps) {
  const service = useService(serviceId)
  const { t } = useLingui()

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
          modifiers={[padding(24, 0, 24, 24)]}
          verticalArrangement={{ spacedBy: 32 }}
        >
          <Text
            modifiers={[fillMaxWidth()]}
            style={{
              fontSize: 32,
              fontWeight: 'bold',
              lineHeight: 32,
              textAlign: 'center',
            }}
          >
            {service.name}
          </Text>
          <FlowRow horizontalArrangement={{ spacedBy: 12 }}>
            <Button
              modifiers={[fillMaxWidth()]}
              onPress={() => openLink(service.url)}
            >
              {t`Open in Browser`}
            </Button>

            {androidAppAvailable && service.packageName && (
              <>
                <Spacer modifiers={[padding(0, 6, 0, 6)]} />
                <Button
                  modifiers={[fillMaxWidth()]}
                  onPress={() => openApp(service.packageName!)}
                >
                  {t`Open installed App`}
                </Button>
              </>
            )}
            {service.appStoreLink &&
              (isArray(service.appStoreLink) ? (
                service.appStoreLink.map(({ name, url }) => (
                  <Column key={name}>
                    <Spacer modifiers={[padding(0, 6, 0, 6)]} />
                    <Button
                      modifiers={[fillMaxWidth()]}
                      onPress={() => openLink(url)}
                      variant="outlined"
                    >
                      {t`Open in {name}`}
                    </Button>
                  </Column>
                ))
              ) : (
                <>
                  <Spacer modifiers={[padding(0, 6, 0, 6)]} />
                  <Button
                    modifiers={[fillMaxWidth()]}
                    onPress={() => openLink(service.appStoreLink as string)}
                    variant="outlined"
                  >
                    {t`Open in App Store`}
                  </Button>
                </>
              ))}
          </FlowRow>
        </Column>
      </ModalBottomSheet>
    </Host>
  )
}
