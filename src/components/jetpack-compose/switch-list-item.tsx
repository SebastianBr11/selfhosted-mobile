import { Icon, Row, Spacer, Switch } from '@expo/ui/jetpack-compose'
import { size, width } from '@expo/ui/jetpack-compose/modifiers'
import { useTheme } from '@/hooks/use-theme'
import { withOpacity } from '@/util/jetpack-compose-util'
import { ListItem } from './list-item'

type SwitchListItemProps = {
  children?: React.ReactNode
  enabled?: boolean
  headline: string
  itemPosition?: 'leading' | 'trailing'
  leadingIcon?: React.ComponentProps<typeof Icon>['source']
  onClick?: () => void
  onValueChange: (value: boolean) => void
  supportingText: string
  value: boolean
}
export function SwitchListItem({
  children,
  enabled = true,
  headline,
  itemPosition,
  leadingIcon,
  onClick,
  onValueChange,
  supportingText,
  value,
}: SwitchListItemProps) {
  const theme = useTheme()
  return (
    <ListItem
      enabled={enabled}
      headline={headline}
      itemPosition={itemPosition}
      leadingIcon={leadingIcon}
      onClick={() => (onClick ? onClick() : onValueChange(!value))}
      supportingText={supportingText}
    >
      {children}
      <ListItem.TrailingContent>
        <Row verticalAlignment="center">
          {onClick && (
            <>
              <Icon
                source={require('@/assets/symbols/chevron_forward.xml')}
                tint={enabled ? theme.onSurfaceVariant : theme.onSurfaceVariant}
              />
              <Spacer modifiers={[width(8)]} />
            </>
          )}
          <Switch
            colors={{
              disabledCheckedThumbColor: withOpacity(
                theme.android.surface,
                0.38,
              ),
              disabledCheckedTrackColor: withOpacity(theme.onSurface, 0.12),
              disabledUncheckedBorderColor: withOpacity(theme.onSurface, 0.12),
              disabledUncheckedThumbColor: withOpacity(theme.onSurface, 0.12),
              disabledUncheckedTrackColor: withOpacity(
                theme.backgroundElementHighest,
                0.12,
              ),
            }}
            enabled={enabled}
            onCheckedChange={onValueChange}
            value={value}
          >
            <Switch.ThumbContent>
              {value ? (
                <Icon
                  modifiers={[
                    size(Switch.DefaultIconSize, Switch.DefaultIconSize),
                  ]}
                  source={require('@/assets/symbols/check.xml')}
                  tint={
                    enabled
                      ? theme.textPrimary
                      : withOpacity(theme.onSurface, 0.12)
                  }
                />
              ) : (
                <Icon
                  modifiers={[
                    size(Switch.DefaultIconSize, Switch.DefaultIconSize),
                  ]}
                  source={require('@/assets/symbols/clear.xml')}
                  tint={theme.backgroundElementHighest}
                />
              )}
            </Switch.ThumbContent>
          </Switch>
        </Row>
      </ListItem.TrailingContent>
    </ListItem>
  )
}
SwitchListItem.LeadingContent = ListItem.LeadingContent
SwitchListItem.SupportingContent = ListItem.SupportingContent
