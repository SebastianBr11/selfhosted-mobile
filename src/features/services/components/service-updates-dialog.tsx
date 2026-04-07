import {
  AlertDialog,
  Column,
  Host,
  RNHostView,
  Text,
  TextButton,
} from '@expo/ui/jetpack-compose'
import { clickable } from '@expo/ui/jetpack-compose/modifiers'
import { useLingui } from '@lingui/react/macro'
import { openBrowserAsync } from 'expo-web-browser'
import { ScrollView } from 'react-native'
import { EnrichedMarkdownText } from 'react-native-enriched-markdown'
import { WebView } from 'react-native-webview'
import { useTheme } from '@/hooks/use-theme'
import { SemanticVersion } from '@/lib/schemas'
import { UpdateData } from '../lib/data-loaders/types'

type ServiceUpdatesDialogProps = {
  currentVersion: SemanticVersion
  hide: () => void
  updateData: UpdateData
}
export function ServiceUpdatesDialog({
  currentVersion,
  hide,
  updateData,
}: ServiceUpdatesDialogProps) {
  const { t } = useLingui()
  const theme = useTheme()
  const { changelog, link, newVersion, releaseTimestamp } = updateData
  return (
    <Host matchContents>
      <AlertDialog
        onDismissRequest={hide}
        properties={{ usePlatformDefaultWidth: false }}
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
                  color={theme.textPrimary.toString()}
                  modifiers={[
                    clickable(() => openBrowserAsync(link), {
                      indication: false,
                    }),
                  ]}
                  style={{ typography: 'bodyMedium' }}
                >
                  {link}
                </Text>
              )}
            </Column>
            {changelog && (
              <RNHostView>
                <ScrollView>
                  <EnrichedMarkdownText
                    flavor="github"
                    markdown={changelog}
                    markdownStyle={{
                      blockquote: { color: theme.onSurfaceVariant.toString() },
                      code: { color: theme.onSurfaceVariant.toString() },
                      em: { color: theme.onSurfaceVariant.toString() },
                      h1: { color: theme.onSurface.toString() },
                      h2: { color: theme.onSurface.toString() },
                      h3: { color: theme.onSurface.toString() },
                      h4: { color: theme.onSurface.toString() },
                      h5: { color: theme.onSurface.toString() },
                      h6: { color: theme.onSurface.toString() },
                      list: { color: theme.onSurfaceVariant.toString() },
                      paragraph: { color: theme.onSurfaceVariant.toString() },
                      strong: { color: theme.onSurfaceVariant.toString() },
                      table: { color: theme.onSurfaceVariant.toString() },
                    }}
                    onLinkPress={(event) => openBrowserAsync(event.url)}
                  />
                </ScrollView>
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
