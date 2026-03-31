import {
  Box,
  Column,
  Host,
  LazyColumn,
  RNHostView,
  Row,
  Text,
} from '@expo/ui/jetpack-compose'
import {
  align,
  clip,
  fillMaxHeight,
  fillMaxSize,
  padding,
  Shapes,
} from '@expo/ui/jetpack-compose/modifiers'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import { useColorScheme } from 'react-native'
import { SwitchListItem } from '@/components/jetpack-compose/switch-list-item'
import { ServiceId } from '@/features/services/lib/service.schema'
import { serviceSystem } from '@/features/services/lib/services.system'
import { schemeDependantIcon } from '@/features/services/util'
import { useTheme } from '@/hooks/use-theme'
import { useLocalServices } from './lib/local-servies'

export function LocalSourceSettingsView() {
  const theme = useTheme()
  const colorScheme = useColorScheme()
  const router = useRouter()

  const { addServiceById, removeServiceById, servicesIdsSet } =
    useLocalServices()
  const builtInServices = serviceSystem.builtIns

  function hasServiceById(serviceId: ServiceId) {
    return servicesIdsSet.has(serviceId)
  }

  function toggleServiceOrNavigate(serviceId: ServiceId) {
    if (!hasServiceById(serviceId)) {
      addServiceById(serviceId)
    }
    router.navigate({
      params: { serviceId: serviceId },
      pathname: '/settings/service-settings/[serviceId]',
    })
  }

  function toggleService(serviceId: ServiceId) {
    if (hasServiceById(serviceId)) {
      removeServiceById(serviceId)
    } else {
      addServiceById(serviceId)
    }
  }

  return (
    <Host matchContents style={{ flex: 1 }}>
      <LazyColumn horizontalAlignment="center" modifiers={[fillMaxHeight()]}>
        <Row>
          <Text
            color={theme.onSurface.toString()}
            modifiers={[align('centerVertically')]}
            style={{ typography: 'headlineMedium' }}
          >
            Choose services
          </Text>
        </Row>
        <Box modifiers={[fillMaxSize(), padding(16, 16, 16, 310)]}>
          <Column
            modifiers={[clip(Shapes.RoundedCorner(16)), fillMaxHeight()]}
            verticalArrangement={{ spacedBy: 2 }}
          >
            {builtInServices.map((service) => (
              <SwitchListItem
                headline={service.name}
                key={service.id}
                onClick={() => toggleServiceOrNavigate(service.id)}
                onValueChange={() => toggleService(service.id)}
                supportingText={service.description}
                value={hasServiceById(service.id)}
              >
                <SwitchListItem.Leading>
                  <RNHostView matchContents>
                    <Image
                      contentFit="cover"
                      key={service.id}
                      source={schemeDependantIcon(colorScheme, service.iconUrl)}
                      style={{ height: 24, width: 24 }}
                    />
                  </RNHostView>
                </SwitchListItem.Leading>
              </SwitchListItem>
            ))}
          </Column>
        </Box>
      </LazyColumn>
    </Host>
  )
}
