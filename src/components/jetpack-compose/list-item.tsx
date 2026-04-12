import { ListItem as BaseListItem, Icon, Text } from '@expo/ui/jetpack-compose'
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
        leadingContentColor: enabled
          ? theme.onSurface
          : withOpacity(theme.onSurface, 0.38),
        overlineContentColor: theme.onSurfaceVariant,
        supportingContentColor: enabled
          ? theme.onSurfaceVariant
          : withOpacity(theme.onSurfaceVariant, 0.38),
      }}
      modifiers={[
        clip(Shapes.RoundedCorner(cornerRadii(itemPosition))),
        ...(onClick && enabled ? [clickable(onClick)] : []),
      ]}
    >
      <BaseListItem.HeadlineContent>
        <Text style={{ typography: 'bodyLarge' }}>{headline}</Text>
      </BaseListItem.HeadlineContent>
      <BaseListItem.SupportingContent>
        <Text style={{ typography: 'bodyMedium' }}>{supportingText}</Text>
      </BaseListItem.SupportingContent>
      {leadingIcon && (
        <BaseListItem.LeadingContent>
          <Icon
            source={leadingIcon}
            tint={
              enabled
                ? theme.onSurfaceVariant
                : withOpacity(theme.onSurfaceVariant, 0.38)
            }
          />
        </BaseListItem.LeadingContent>
      )}
      {children}
    </BaseListItem>
  )
}

ListItem.LeadingContent = BaseListItem.LeadingContent
ListItem.TrailingContent = BaseListItem.TrailingContent
ListItem.SupportingContent = BaseListItem.SupportingContent
