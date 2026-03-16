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
import { useService } from '@/hooks/use-services'
import { isArray } from '@/util/is-type'
import { ServiceId } from '@/lib/service.schema'

type ServiceBottomSheetProps = {
  hide: () => void
  serviceId: ServiceId
}
export default function ServiceBottomSheet({
  hide,
  serviceId,
}: ServiceBottomSheetProps) {
  const service = useService(serviceId)
  if (!service) {
    hide()
    return null
  }
  function openLink(url: string) {
    WebBrowser.openBrowserAsync(url)
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
