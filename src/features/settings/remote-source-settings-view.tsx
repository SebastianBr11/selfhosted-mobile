import {
  AnimatedVisibility,
  BasicTextField,
  Box,
  Button,
  Column,
  EnterTransition,
  ExitTransition,
  FilledTonalButton,
  Host,
  LinearWavyProgressIndicator,
  Text,
  useNativeState,
} from '@expo/ui/jetpack-compose'
import {
  background,
  clip,
  fillMaxWidth,
  padding,
  Shapes,
} from '@expo/ui/jetpack-compose/modifiers'
import { useLingui } from '@lingui/react/macro'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { InlineInsetMedium } from '@/constants/theme'
import { useTheme } from '@/hooks/use-theme'
import { useServicesUrl } from '../services/hooks/use-services-url'
import { remoteServicesQueryOptions } from '../services/lib/user-services.queries'
import { ConvertToLocalSourceDialog } from './components/convert-to-local-source-dialog'

export default function RemoteSourceSettingsView() {
  const theme = useTheme()
  const { errors, setUrl, url, urlFromEnv, valid: urlValid } = useServicesUrl()
  const { error, fetchStatus, isFetching, isSuccess, refetch } = useQuery(
    remoteServicesQueryOptions(url),
  )
  const text = useNativeState(url)
  const { t } = useLingui()
  const [showConvertToLocalSourceDialog, setShowConvertToLocalSourceDialog] =
    useState(false)

  return (
    <Host style={{ flex: 1 }}>
      <Column
        modifiers={[padding(InlineInsetMedium, 0, InlineInsetMedium, 0)]}
        verticalArrangement={{ spacedBy: 16 }}
      >
        <Column verticalArrangement={{ spacedBy: 8 }}>
          <Text
            color={theme.textPrimary.toString()}
            style={{ typography: 'labelLarge' }}
          >
            {t`Services URL `}
            {urlFromEnv && (
              <Text
                color={theme.onSurfaceVariant.toString()}
              >{t`(from environment)`}</Text>
            )}
          </Text>
          <BasicTextField
            enabled={!urlFromEnv}
            keyboardOptions={{ keyboardType: 'uri' }}
            maxLines={1}
            modifiers={[
              fillMaxWidth(),
              clip(Shapes.RoundedCorner(8)),
              background(
                urlFromEnv
                  ? theme.android.backgroundElementHigh
                  : theme.backgroundElement,
              ),
              padding(20, 16, 20, 16),
            ]}
            onValueChange={(value) => setUrl(value)}
            textStyle={{
              color: !urlFromEnv ? theme.onSurface : theme.textSecondary,
            }}
            value={text}
          ></BasicTextField>
          {!urlValid ? (
            <Text
              color={theme.textError.toString()}
              style={{ typography: 'labelLarge' }}
            >
              {errors[0]}
            </Text>
          ) : null}
        </Column>
        <Column verticalArrangement={{ spacedBy: 8 }}>
          <Button modifiers={[fillMaxWidth()]} onClick={refetch}>
            <Text
              style={{ typography: 'labelLarge' }}
            >{t`Test connection`}</Text>
          </Button>

          <Box>
            <AnimatedVisibility
              modifiers={[fillMaxWidth()]}
              visible={isFetching}
            >
              <LinearWavyProgressIndicator />
            </AnimatedVisibility>

            {fetchStatus !== 'fetching' && (
              <Column verticalArrangement={{ spacedBy: 8 }}>
                <Text
                  color={
                    isSuccess
                      ? theme.textSuccess.toString()
                      : theme.textError.toString()
                  }
                >
                  {isSuccess ? t`Connected` : t`Not Connected`}
                </Text>
                {fetchStatus === 'paused' && (
                  <Text
                    color={theme.onSurface.toString()}
                    style={{ typography: 'labelLarge' }}
                  >
                    {t`Connect to the Internet to fetch new data`}
                  </Text>
                )}
                {error && (
                  <Text color={theme.textError.toString()}>
                    {error.message}
                  </Text>
                )}
              </Column>
            )}
          </Box>
        </Column>
        <AnimatedVisibility
          enterTransition={EnterTransition.fadeIn()}
          exitTransition={ExitTransition.fadeOut()}
          visible={isSuccess}
        >
          <FilledTonalButton
            modifiers={[fillMaxWidth()]}
            onClick={() => setShowConvertToLocalSourceDialog(true)}
          >
            <Text style={{ typography: 'labelLarge' }}>
              {t`Convert to local services`}
            </Text>
          </FilledTonalButton>
        </AnimatedVisibility>
      </Column>
      {showConvertToLocalSourceDialog && (
        <ConvertToLocalSourceDialog
          hide={() => setShowConvertToLocalSourceDialog(false)}
        />
      )}
    </Host>
  )
}
