import { fetch } from 'expo/fetch'
import * as v from 'valibot'
import { LeadingVSemanticVersionSchema } from '@/lib/schemas'
import { DataLoader } from './types'

const VersionResponseSchema = v.pipe(
  v.string(),
  v.transform((s) => {
    // The response from Dozzle is wrapped in <pre>
    const m = s.match(/^<pre\b[^>]*>([\s\S]*)<\/pre>$/i)
    console.log('m', m)
    return m ? m[1] : s
  }),
  LeadingVSemanticVersionSchema,
)

export type DozzleVersion = v.InferOutput<typeof VersionResponseSchema>

export const dozzle = {
  dozzle: {
    checkHealth: async (serviceUrl) => {
      const url = new URL('/healthcheck', serviceUrl)
      const response = await fetch(url)
      return response.ok
    },
    loadPublicData: async (serviceUrl) => {
      const url = new URL('/api/version', serviceUrl)
      const response = await fetch(url)
      const data = await response.text()
      const version = v.parse(VersionResponseSchema, data)
      return {
        data: version,
        version,
      }
    },
  },
} satisfies DataLoader<'dozzle', DozzleVersion>
