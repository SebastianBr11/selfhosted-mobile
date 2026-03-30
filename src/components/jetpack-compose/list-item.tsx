import { ListItem as BaseListItem, Icon } from '@expo/ui/jetpack-compose'
import { clickable, clip, Shapes } from '@expo/ui/jetpack-compose/modifiers'
import { useTheme } from '@/hooks/use-theme'
import {
  cornerRadii,
  ItemPosition,
  withOpacity,
} from '@/util/jetpack-compose-util'

type ListItemProps = {
  children?: React.ReactNode
  enabled?: boolean
  headline: string
  icon: React.ComponentProps<typeof Icon>['source']
  itemPosition?: ItemPosition
  onClick?: () => void
  supportingText: string
}
export function ListItem({
  children = null,
  enabled = true,
  headline,
  icon,
  itemPosition,
  onClick,
  supportingText,
}: ListItemProps) {
  const theme = useTheme()

  return (
    <BaseListItem
      colors={{
        containerColor: theme.backgroundElement,
        headlineColor: enabled
          ? theme.onSurface
          : withOpacity(theme.onSurface, 0.38),
        overlineColor: theme.onSurfaceVariant,
        supportingColor: enabled
          ? theme.onSurfaceVariant
          : withOpacity(theme.onSurfaceVariant, 0.38),
      }}
      headline={headline}
      modifiers={[
        clip(Shapes.RoundedCorner(cornerRadii(itemPosition))),
        ...(onClick && enabled ? [clickable(onClick)] : []),
      ]}
      supportingText={supportingText}
    >
      <BaseListItem.Leading>
        <Icon
          source={icon}
          tintColor={
            enabled
              ? theme.onSurfaceVariant
              : withOpacity(theme.onSurfaceVariant, 0.38)
          }
        />
      </BaseListItem.Leading>
      {children}
    </BaseListItem>
  )
}

ListItem.Leading = BaseListItem.Leading
ListItem.Trailing = BaseListItem.Trailing
