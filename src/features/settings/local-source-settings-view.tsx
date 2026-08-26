import {
  Box,
  Column,
  Host,
  Icon,
  IconButton,
  LazyColumn,
  RNHostView,
  Text,
} from '@expo/ui/jetpack-compose'
import {
  align,
  clip,
  fillMaxWidth,
  padding,
  Shapes,
} from '@expo/ui/jetpack-compose/modifiers'
import { useLingui } from '@lingui/react/macro'
import { File, Paths } from 'expo-file-system'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import { shareAsync } from 'expo-sharing'
import { useColorScheme } from 'react-native'
import { SwitchListItem } from '@/components/jetpack-compose/switch-list-item'
import { InlineInsetSmall } from '@/constants/theme'
import {
  ServiceId,
  serviceSystem,
} from '@/features/services/lib/services.system'
import { schemeDependantIcon } from '@/features/services/util'
import { useTheme } from '@/hooks/use-theme'
import { getLocalServicesState, useLocalServices } from './lib/local-servies'

export function LocalSourceSettingsView() {
  const theme = useTheme()
  const colorScheme = useColorScheme()
  const router = useRouter()
  const { t } = useLingui()

  const { addServiceById, removeServiceById, servicesIdsSet } =
    useLocalServices()
  const builtInServices = serviceSystem.builtIns

  function hasServiceById(serviceId: ServiceId) {
    return servicesIdsSet.has(serviceId)
  }

  function toggleServiceOrNavigate(serviceId: ServiceId) {
    if (!hasServiceById(serviceId)) {
      return router.navigate({
        params: { serviceId },
        pathname: '/settings/add/[serviceId]',
      })
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

  function shareServices() {
    const servicesFile = new File(Paths.cache, 'services.json')
    const services = getLocalServicesState().services
    servicesFile.write(JSON.stringify({ services }))
    shareAsync(servicesFile.uri, {
      dialogTitle: 'Share services',
      mimeType: 'application/json',
    })
  }

  return (
    <Host style={{ flex: 1 }}>
      <LazyColumn
        horizontalAlignment="center"
        modifiers={[padding(InlineInsetSmall, 0, InlineInsetSmall, 0)]}
        verticalArrangement={{ spacedBy: 16 }}
      >
        <Box modifiers={[fillMaxWidth()]}>
          <Text
            color={theme.onSurface.toString()}
            modifiers={[align('center')]}
            style={{ typography: 'headlineMedium' }}
          >
            {t`Choose services`}
          </Text>
          <IconButton modifiers={[align('topEnd')]} onClick={shareServices}>
            <Icon
              source={require('@/assets/symbols/save.xml')}
              tint={theme.android.textSecondary}
            />
          </IconButton>
        </Box>
        <Box modifiers={[padding(0, 0, 0, 16)]}>
          <Column
            modifiers={[clip(Shapes.RoundedCorner(16))]}
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
                <SwitchListItem.LeadingContent>
                  <RNHostView matchContents>
                    <Image
                      contentFit="contain"
                      key={service.id}
                      source={schemeDependantIcon(colorScheme, service.iconUrl)}
                      style={{ height: 24, width: 24 }}
                    />
                  </RNHostView>
                </SwitchListItem.LeadingContent>
              </SwitchListItem>
            ))}
          </Column>
        </Box>
      </LazyColumn>
    </Host>
  )
}
