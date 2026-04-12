import { fetch } from 'expo/fetch'
import * as v from 'valibot'
import { SemanticVersionSchema } from '@/lib/schemas'
import { DataLoader } from './types'

// Schema from https://codeberg.org/readeck/readeck/src/branch/main/docs/api/info/routes.yaml
const InfoSchema = v.object({
  features: v.array(v.union([v.literal('email'), v.literal('oauth')])),
  version: v.object({
    build: v.string(),
    canonical: v.string(),
    release: SemanticVersionSchema,
  }),
})

export type ReadeckInfo = v.InferOutput<typeof InfoSchema>

export const readeck = {
  readeck: {
    checkHealth: async (serviceUrl) => {
      const url = new URL('/', serviceUrl)
      const response = await fetch(url)
      return response.ok
    },
    loadPublicData: async (serviceUrl) => {
      const url = new URL('/api/info', serviceUrl)
      const response = await fetch(url)
      const data = await response.json()
      const info = v.parse(InfoSchema, data)
      return {
        data: info,
        version: info.version.release,
      }
    },
    repo: { name: 'readeck/readeck', vcs: 'codeberg' },
  },
} satisfies DataLoader<'readeck', ReadeckInfo>
