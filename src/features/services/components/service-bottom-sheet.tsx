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
import * as WebBrowser from 'expo-web-browser'
import { useState } from 'react'
import { useTheme } from '@/hooks/use-theme'
import { isArray } from '@/util/is-type'
import { useSettings } from '../../settings/hooks/use-settings'
import { useInstalledApp } from '../hooks/use-installed-app'
import { useService } from '../hooks/use-service'
import { useServiceData } from '../hooks/use-service-data'
import { ServiceId } from '../lib/services.system'
import { ServiceHealthDialog } from './service-health-dialog'
import { ServiceUpdatesDialog } from './service-updates-dialog'

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
  const { t } = useLingui()
  const theme = useTheme()

  const service = useService(serviceId)
  const { data, error, isError, isLoading } = useServiceData(serviceId)
  const { appAvailable, openApp } = useInstalledApp(service?.packageName)

  const { fetchServiceData, showAppStoreButton, showOpenInBrowserButton } =
    useSettings()

  const [showHealthDialog, setShowHealthDialog] = useState(false)
  const [showUpdatesDialog, setShowUpdatesDialog] = useState(false)

  if (!service) {
    hide()
    return null
  }

  function openLink(url: string) {
    WebBrowser.openBrowserAsync(url)
  }

  return (
    <>
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
                {fetchServiceData &&
                  data?.healthy !== undefined &&
                  (data.healthy ? (
                    <IconButton onClick={() => setShowHealthDialog(true)}>
                      <Icon
                        contentDescription="Healthy"
                        source={require('@/assets/symbols/heart_check.xml')}
                        tint={theme.textSuccess}
                      />
                    </IconButton>
                  ) : (
                    <IconButton onClick={() => setShowHealthDialog(true)}>
                      <Icon
                        contentDescription="Unhealthy"
                        source={require('@/assets/symbols/heart_broken.xml')}
                        tint={theme.textError}
                      />
                    </IconButton>
                  ))}
              </Box>
              <Box modifiers={[weight(4), align('centerVertically')]}>
                <FlowRow horizontalArrangement={'center'}>
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
                  {fetchServiceData && data?.publicData?.version && (
                    <Text
                      color={theme.android.textPrimary.toString()}
                      modifiers={[padding(16, 8, 16, 8)]}
                      style={{
                        typography: 'labelLarge',
                      }}
                    >
                      {data?.publicData?.version.raw}
                    </Text>
                  )}
                </FlowRow>
              </Box>
              <Spacer modifiers={[width(8)]} />
              <Box modifiers={[weight(1)]}>
                {fetchServiceData && isError && (
                  <IconButton onClick={() => setShowHealthDialog(true)}>
                    <Icon
                      contentDescription="Unavailable"
                      source={require('@/assets/symbols/error.xml')}
                      tint={theme.textError}
                    />
                  </IconButton>
                )}
                {fetchServiceData && data?.updateData?.hasUpdate && (
                  <FilledTonalIconButton
                    onClick={() => setShowUpdatesDialog(true)}
                  >
                    <Icon
                      contentDescription="Update available"
                      source={require('@/assets/symbols/update.xml')}
                      tint={theme.onSurface}
                    />
                  </FilledTonalIconButton>
                )}
              </Box>
            </Row>
            {fetchServiceData &&
              (isLoading ? (
                <CircularWavyProgressIndicator
                  modifiers={[align('centerHorizontally')]}
                />
              ) : data?.notAvailable ? (
                <Row>
                  <Text>{t`No additional data available`}</Text>
                </Row>
              ) : isError ? (
                <Row>
                  <Text>{t`An error ocurred`}</Text>
                </Row>
              ) : null)}
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
      {showHealthDialog && (
        <ServiceHealthDialog
          error={error}
          healthy={!!data?.healthy}
          hide={() => setShowHealthDialog(false)}
        />
      )}
      {showUpdatesDialog && data?.updateData?.hasUpdate && (
        <ServiceUpdatesDialog
          currentVersion={data.publicData.version}
          hide={() => setShowUpdatesDialog(false)}
          updateData={data.updateData}
        />
      )}
    </>
  )
}
