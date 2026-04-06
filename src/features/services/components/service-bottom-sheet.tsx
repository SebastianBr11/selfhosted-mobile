import {
  Box,
  Button,
  CircularWavyProgressIndicator,
  Column,
  FilledTonalIconButton,
  FlowRow,
  Host,
  Icon,
  IconButton,
  ModalBottomSheet,
  OutlinedButton,
  Row,
  Spacer,
  Text,
} from '@expo/ui/jetpack-compose'
import {
  align,
  fillMaxWidth,
  padding,
  weight,
  width,
} from '@expo/ui/jetpack-compose/modifiers'
import { useLingui } from '@lingui/react/macro'
import { useQuery } from '@tanstack/react-query'
import * as WebBrowser from 'expo-web-browser'
import { useTheme } from '@/hooks/use-theme'
import { isArray } from '@/util/is-type'
import { useSettings } from '../../settings/hooks/use-settings'
import { useInstalledApp } from '../hooks/use-installed-app'
import { useService } from '../hooks/use-service'
import { useServicesUrl } from '../hooks/use-services-url'
import { ServiceId } from '../lib/services.system'
import { userServiceQueryOptions } from '../lib/user-services.queries'

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
  const { showAppStoreButton, showOpenInBrowserButton, useLocalSource } =
    useSettings()
  const { appAvailable, openApp } = useInstalledApp(service?.packageName)
  const { t } = useLingui()
  const theme = useTheme()
  const { url } = useServicesUrl()
  const { data, isError, isLoading } = useQuery(
    userServiceQueryOptions(url, serviceId, useLocalSource),
  )

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
          <Row
            horizontalArrangement="center"
            modifiers={[fillMaxWidth()]}
            verticalArrangement="center"
          >
            <Box modifiers={[weight(1)]}>
              {data?.healthy !== undefined &&
                (data.healthy ? (
                  <IconButton>
                    <Icon
                      contentDescription="Healthy"
                      source={require('@/assets/symbols/heart_check.xml')}
                      tintColor={theme.textSuccess}
                    />
                  </IconButton>
                ) : (
                  <IconButton>
                    <Icon
                      contentDescription="Unhealthy"
                      source={require('@/assets/symbols/heart_broken.xml')}
                      tintColor={theme.textError}
                    />
                  </IconButton>
                ))}
            </Box>
            <Box modifiers={[weight(4), align('centerVertically')]}>
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
            </Box>
            <Spacer modifiers={[width(8)]} />
            <Box modifiers={[weight(1)]}>
              <FilledTonalIconButton>
                <Icon
                  contentDescription="Update available"
                  source={require('@/assets/symbols/update.xml')}
                  tintColor={theme.onSurface}
                />
              </FilledTonalIconButton>
            </Box>
          </Row>
          {isLoading ? (
            <CircularWavyProgressIndicator
              modifiers={[align('centerHorizontally')]}
            />
          ) : data?.publicData?.version ? (
            <Row>
              <Text>{data?.publicData.version}</Text>
            </Row>
          ) : data?.notAvailable ? (
            <Row>
              <Text>{t`No additional data available`}</Text>
            </Row>
          ) : isError ? (
            <Row>
              <Text>{t`An error ocurred`}</Text>
            </Row>
          ) : null}
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
                service.appStoreLink?.map(({ name, url }) => (
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
