import { t } from '@lingui/core/macro'
import * as v from 'valibot'
import { emptyMessage, stringMessage } from './schema-messages'

export const UrlSchema = v.pipe(
  v.string(({ received }) => stringMessage('URL', received)),
  v.nonEmpty(() => emptyMessage('URL')),
  v.url(({ received }) => t`The URL "${received}" is invalid.`),
)

const semverRegex =
  /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/

export const SemanticVersionSchema = v.pipe(
  v.nonNullable(
    v.pipe(
      v.string(),
      v.transform((s) => {
        const result = semverRegex.exec(s)
        if (result) {
          return {
            build: result[5],
            major: Number(result[1]),
            minor: Number(result[2]),
            patch: Number(result[3]),
            prerelease: result[4],
            raw: s,
            toString: () => s,
          }
        }
      }),
    ),
  ),
  v.brand('SemanticVersion'),
)
export type SemanticVersion = v.InferOutput<typeof SemanticVersionSchema>

/**
 * Same as {@link SemanticVersionSchema} but with a leading 'v'
 */
export const LeadingVSemanticVersionSchema = v.pipe(
  v.string(),
  v.transform((versionString) => versionString.substring(1)), // remove leading 'v'
  SemanticVersionSchema,
)

/**
 * Creates a schema that accepts an array of unique values and returns an array.
 * Taken from https://github.com/open-circle/valibot/issues/685#issuecomment-2198360532
 */
export const setFromArray = <
  S extends v.BaseSchema<unknown, unknown, v.BaseIssue<unknown>>,
>(
  schema: S,
) =>
  v.pipe(
    v.array(schema),
    v.check((v) => new Set(v).size === v.length, 'Expected unique items'),
    v.transform((v) => new Set(v)),
  )
