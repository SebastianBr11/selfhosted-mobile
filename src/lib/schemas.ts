import { t } from '@lingui/core/macro'
import * as v from 'valibot'
import { emptyMessage, stringMessage } from './schema-messages'

export const UrlSchema = v.pipe(
  v.string(({ received }) => stringMessage('URL', received)),
  v.nonEmpty(() => emptyMessage('URL')),
  v.url(({ received }) => t`The URL "${received}" is invalid.`),
)
