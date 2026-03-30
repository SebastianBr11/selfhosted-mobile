import {
  Button,
  Column,
  FlowRow,
  Host,
  ModalBottomSheet,
  OutlinedButton,
  Spacer,
  Text,
} from '@expo/ui/jetpack-compose'
import { fillMaxWidth, padding } from '@expo/ui/jetpack-compose/modifiers'
import { useLingui } from '@lingui/react/macro'
import * as WebBrowser from 'expo-web-browser'
import { ServiceId } from '@/features/services/lib/service.schema'
import { isArray } from '@/util/is-type'
import { useSettings } from '../settings/hooks/use-settings'
import { useInstalledApp } from './hooks/use-installed-app'
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
  const { showAppStoreButton, showOpenInBrowserButton } = useSettings()
  const { appAvailable, openApp } = useInstalledApp(service?.packageName)
  const { t } = useLingui()

  if (!service) {
    hide()
    return null
  }

  function openLink(url: string) {
    WebBrowser.openBrowserAsync(url)
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
            {showOpenInBrowserButton && (
              <Button
                modifiers={[fillMaxWidth()]}
                onClick={() => openLink(service.url)}
              >
                <Text
                  style={{ typography: 'labelLarge' }}
                >{t`Open in Browser`}</Text>
              </Button>
            )}

            {appAvailable && service.packageName && (
              <>
                <Spacer modifiers={[padding(0, 6, 0, 6)]} />
                <Button modifiers={[fillMaxWidth()]} onClick={openApp}>
                  <Text
                    style={{ typography: 'labelLarge' }}
                  >{t`Open installed App`}</Text>
                </Button>
              </>
            )}
            {service.appStoreLink &&
              showAppStoreButton &&
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
