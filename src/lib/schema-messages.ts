import { t } from '@lingui/core/macro'

/**
 * Create a message for a string validation error.
 */
export const stringMessage = (name: string, received: string) =>
  t`The ${name} must be a string. The value "${received}" is invalid.`

/**
 * Create a message for a nonempty validation error.
 */
export const emptyMessage = (name: string) => t`The ${name} must not be empty.`
