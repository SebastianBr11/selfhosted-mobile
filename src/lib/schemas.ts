import * as v from 'valibot'

export const UrlSchema = v.pipe(v.string(), v.nonEmpty(), v.url())
