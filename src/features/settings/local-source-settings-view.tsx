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
import { useState } from 'react'
import { useColorScheme } from 'react-native'
import { SwitchListItem } from '@/components/jetpack-compose/switch-list-item'
import { ServiceId } from '@/features/services/lib/service.schema'
import { serviceSystem } from '@/features/services/lib/services.system'
import { schemeDependantIcon } from '@/features/services/util'
import { useTheme } from '@/hooks/use-theme'

export function LocalSourceSettingsView() {
  const theme = useTheme()
  const colorScheme = useColorScheme()
  const router = useRouter()

  const [selectedServices, setSelectedServices] = useState(
    {} as Record<ServiceId, boolean>,
  )
  const builtInServices = serviceSystem.builtIns

  function toggleServiceOrNavigate(serviceId: ServiceId) {
    if (!selectedServices[serviceId]) {
      toggleService(serviceId)
    }
    router.navigate({
      params: { serviceId: serviceId },
      pathname: '/settings/service-settings/[serviceId]',
    })
  }

  function toggleService(serviceId: ServiceId) {
    setSelectedServices((prevSelectedServices) => ({
      ...prevSelectedServices,
      [serviceId]: !prevSelectedServices[serviceId],
    }))
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
                value={selectedServices[service.id]}
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
