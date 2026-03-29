import {
  Button,
  Column,
  FlowRow,
  Host,
  ModalBottomSheet,
  OutlinedButton,
  Shape,
  Spacer,
  Text,
} from '@expo/ui/jetpack-compose'
import {
  fillMaxWidth,
  padding,
  Shapes,
} from '@expo/ui/jetpack-compose/modifiers'
import { useLingui } from '@lingui/react/macro'
import * as IntentLauncher from 'expo-intent-launcher'
import * as WebBrowser from 'expo-web-browser'
import { useEffect, useState } from 'react'
import { ServiceId } from '@/features/services/lib/service.schema'
import { isArray } from '@/util/is-type'
import { useService } from './hooks/use-services'

type ServiceBottomSheetProps = {
  children?: React.ReactNode
  hide: () => void
  serviceId: ServiceId
}
export default function ServiceBottomSheet({
  children,
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
          {children ? children : null}
          <FlowRow horizontalArrangement={{ spacedBy: 12 }}>
            <Button
              modifiers={[fillMaxWidth()]}
              onClick={() => openLink(service.url)}
            >
              <Text
                style={{ typography: 'labelLarge' }}
              >{t`Open in Browser`}</Text>
            </Button>

            {androidAppAvailable && service.packageName && (
              <>
                <Spacer modifiers={[padding(0, 6, 0, 6)]} />
                <Button
                  modifiers={[fillMaxWidth()]}
                  onClick={() => openApp(service.packageName!)}
                >
                  <Text
                    style={{ typography: 'labelLarge' }}
                  >{t`Open installed App`}</Text>
                </Button>
              </>
            )}
            {service.appStoreLink &&
              (isArray(service.appStoreLink) ? (
                service.appStoreLink.map(({ name, url }) => (
                  <Column key={name}>
                    <Spacer modifiers={[padding(0, 6, 0, 6)]} />
                    <OutlinedButton
                      modifiers={[fillMaxWidth()]}
                      onClick={() => openLink(url)}
                    >
                      <Text
                        style={{ typography: 'labelLarge' }}
                      >{t`Open in {name}`}</Text>
                    </OutlinedButton>
                  </Column>
                ))
              ) : (
                <>
                  <Spacer modifiers={[padding(0, 6, 0, 6)]} />
                  <OutlinedButton
                    modifiers={[fillMaxWidth()]}
                    onClick={() => openLink(service.appStoreLink as string)}
                  >
                    <Text
                      style={{ typography: 'labelLarge' }}
                    >{t`Open in App Store`}</Text>
                  </OutlinedButton>
                </>
              ))}
          </FlowRow>
        </Column>
      </ModalBottomSheet>
    </Host>
  )
}
