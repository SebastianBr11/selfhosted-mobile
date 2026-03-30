import { Icon, Switch } from '@expo/ui/jetpack-compose'
import { size } from '@expo/ui/jetpack-compose/modifiers'
import { useTheme } from '@/hooks/use-theme'
import { withOpacity } from '@/util/jetpack-compose-util'
import { ListItem } from './list-item'

type SwitchListItemProps = {
  enabled?: boolean
  headline: string
  icon: React.ComponentProps<typeof Icon>['source']
  itemPosition?: 'leading' | 'trailing'
  onValueChange: (value: boolean) => void
  supportingText: string
  value: boolean
}
export function SwitchListItem({
  enabled = true,
  headline,
  icon,
  itemPosition,
  onValueChange,
  supportingText,
  value,
}: SwitchListItemProps) {
  const theme = useTheme()
  return (
    <ListItem
      enabled={enabled}
      headline={headline}
      icon={icon}
      itemPosition={itemPosition}
      onClick={() => onValueChange(!value)}
      supportingText={supportingText}
    >
      <ListItem.Trailing>
        <Switch
          colors={{
            disabledCheckedThumbColor: withOpacity(theme.android.surface, 0.38),
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
                tintColor={
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
                tintColor={theme.backgroundElementHighest}
              />
            )}
          </Switch.ThumbContent>
        </Switch>
      </ListItem.Trailing>
    </ListItem>
  )
}
