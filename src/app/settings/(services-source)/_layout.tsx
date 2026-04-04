import {
  Column,
  Host,
  Icon,
  IconButton,
  Row,
  Text,
  ToggleButton,
} from '@expo/ui/jetpack-compose'
import {
  fillMaxWidth,
  paddingAll,
  weight,
} from '@expo/ui/jetpack-compose/modifiers'
import { t } from '@lingui/core/macro'
import { useLingui } from '@lingui/react/macro'
import { useRouter } from 'expo-router'
import { useColorScheme } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ThemedView } from '@/components/themed-view'
import { InlineInsetMedium } from '@/constants/theme'
import { useSettings } from '@/features/settings/hooks/use-settings'
import { useTheme } from '@/hooks/use-theme'
import { MaterialTopTabs } from '@/navigators'

export default function ServicesSourceSettingsLayout() {
  const insets = useSafeAreaInsets()
  const theme = useTheme()
  const colorScheme = useColorScheme()
  const router = useRouter()
  const { t } = useLingui()

  const { setUseLocalSource, setUseRemoteSource, useRemoteSource } =
    useSettings()

  return (
    <MaterialTopTabs
      backBehavior="none"
      initialRouteName={
        useRemoteSource ? 'remote-source-settings' : 'local-source-settings'
      }
      screenOptions={{
        sceneStyle: {
          backgroundColor: theme.background,
        },
        swipeEnabled: false,
        tabBarScrollEnabled: true,
      }}
      tabBar={({ navigation, state }) => (
        <ThemedView style={{ paddingTop: insets.top }} type="background">
          <Host colorScheme={colorScheme} matchContents>
            <Column
              modifiers={[paddingAll(InlineInsetMedium)]}
              verticalArrangement={{ spacedBy: 32 }}
            >
              <Row
                horizontalArrangement="spaceBetween"
                modifiers={[fillMaxWidth()]}
                verticalAlignment="center"
              >
                <Text
                  color={theme.onSurface.toString()}
                  style={{ typography: 'displayMedium' }}
                >
                  {t`Settings`}
                </Text>
                <IconButton
                  onClick={() => router.navigate('/settings/more-settings')}
                >
                  <Icon
                    source={require('@/assets/symbols/settings.xml')}
                    tintColor={theme.onSurface}
                  />
                </IconButton>
              </Row>
              <Row
                horizontalArrangement={{ spacedBy: 8 }}
                modifiers={[fillMaxWidth()]}
              >
                {state.routes.map((route, index) => {
                  const isLocalSourceRoute =
                    route.name === 'local-source-settings'
                  const label = isLocalSourceRoute
                    ? t`Use local source`
                    : t`Use remote source`
                  const selected = state.index === index
                  return (
                    <ToggleButton
                      checked={selected}
                      colors={{
                        containerColor: theme.backgroundElement,
                      }}
                      key={route.key}
                      modifiers={[weight(1)]}
                      onCheckedChange={() => {
                        if (isLocalSourceRoute) {
                          setUseLocalSource(true)
                        } else {
                          setUseRemoteSource(true)
                        }
                        navigation.navigate(route.name)
                      }}
                    >
                      <Text style={{ typography: 'labelLarge' }}>{label}</Text>
                    </ToggleButton>
                  )
                })}
              </Row>
            </Column>
          </Host>
        </ThemedView>
      )}
    >
      <MaterialTopTabs.Screen name="remote-source-settings" />
      <MaterialTopTabs.Screen name="local-source-settings" />
    </MaterialTopTabs>
  )
}
