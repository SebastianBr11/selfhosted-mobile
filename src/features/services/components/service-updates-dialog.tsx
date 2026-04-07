import {
  AlertDialog,
  Column,
  Host,
  RNHostView,
  Text,
  TextButton,
} from '@expo/ui/jetpack-compose'
import { WebView } from 'react-native-webview'
import { useLingui } from '@lingui/react/macro'
import { UpdateData } from '../lib/data-loaders/types'
import { useTheme } from '@/hooks/use-theme'
import { useColorScheme } from 'react-native'
import { clickable } from '@expo/ui/jetpack-compose/modifiers'
import { openBrowserAsync } from 'expo-web-browser'
import { SemanticVersion } from '@/lib/schemas'

type ServiceUpdatesDialogProps = {
  hide: () => void
  updateData: UpdateData
  currentVersion: SemanticVersion
}
export function ServiceUpdatesDialog({
  hide,
  updateData,
  currentVersion,
}: ServiceUpdatesDialogProps) {
  const { t } = useLingui()
  const theme = useTheme()
  const colorScheme = useColorScheme()
  const { changelog, link, newVersion, releaseTimestamp } = updateData
  return (
    <Host matchContents>
      <AlertDialog
        properties={{ usePlatformDefaultWidth: false }}
        onDismissRequest={hide}
      >
        <AlertDialog.Title>
          <Text
            style={{ typography: 'titleLarge' }}
          >{t`Changes since ${currentVersion}`}</Text>
        </AlertDialog.Title>
        <AlertDialog.Text>
          <Column verticalArrangement={{ spacedBy: 16 }}>
            <Column verticalArrangement={{ spacedBy: 8 }}>
              <Text style={{ typography: 'bodyLarge' }}>
                {t`Version ${newVersion} is available.`}
              </Text>
              {releaseTimestamp && (
                <Text>
                  {t`Release date:`}{' '}
                  {Intl.DateTimeFormat('default').format(
                    new Date(releaseTimestamp),
                  )}
                </Text>
              )}
              {link && (
                <Text
                  modifiers={[
                    clickable(() => openBrowserAsync(link), {
                      indication: false,
                    }),
                  ]}
                  style={{ typography: 'bodyMedium' }}
                  color={theme.textPrimary.toString()}
                >
                  {link}
                </Text>
              )}
            </Column>
            {changelog && (
              <RNHostView>
                <WebView
                  links
                  forceDarkOn={colorScheme === 'dark'}
                  textZoom={350}
                  style={{ backgroundColor: theme.backgroundElement }}
                  source={{
                    // Adding target="_blank" makes links open in the browser instead of in the WebView.
                    html: `<head><base target="_blank"></head>
                    <style>
                       body { color: ${theme.onSurface.toString()}; }
                       a { color: ${theme.textPrimary.toString()}; }
                    </style>${changelog}`,
                  }}
                />
              </RNHostView>
            )}
          </Column>
        </AlertDialog.Text>
        <AlertDialog.DismissButton>
          <TextButton onClick={hide}>
            <Text>{t`Dismiss`}</Text>
          </TextButton>
        </AlertDialog.DismissButton>
      </AlertDialog>
    </Host>
  )
}
