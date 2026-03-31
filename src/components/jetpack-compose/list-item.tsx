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
  itemPosition?: ItemPosition
  leadingIcon?: React.ComponentProps<typeof Icon>['source']
  onClick?: () => void
  supportingText: string
}
export function ListItem({
  children = null,
  enabled = true,
  headline,
  itemPosition,
  leadingIcon,
  onClick,
  supportingText,
}: ListItemProps) {
  const theme = useTheme()

  return (
    <BaseListItem
      /*
       * I tried to align the colors with the values from the Material components GitHub page.
       * @see https://github.com/material-components/material-components-android/blob/master/lib/java/com/google/android/material/listitem/res/values/tokens.xml
       * But those seem to be a bit different from the ones in the Android settings.
       */
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
      {leadingIcon && (
        <BaseListItem.Leading>
          <Icon
            source={leadingIcon}
            tintColor={
              enabled
                ? theme.onSurfaceVariant
                : withOpacity(theme.onSurfaceVariant, 0.38)
            }
          />
        </BaseListItem.Leading>
      )}
      {children}
    </BaseListItem>
  )
}

ListItem.Leading = BaseListItem.Leading
ListItem.Trailing = BaseListItem.Trailing
ListItem.SupportingContent = BaseListItem.SupportingContent
