import { fetch } from 'expo/fetch'
import * as v from 'valibot'
import { SemanticVersionSchema } from '@/lib/schemas'
import { DataLoader } from './types'

const VersionSchema = v.object({
  version: SemanticVersionSchema,
})

export type ForgejoVersion = v.InferOutput<typeof VersionSchema>

export const forgejo = {
  forgejo: {
    checkHealth: async (serviceUrl) => {
      const url = new URL('/api/healthz', serviceUrl)
      const response = await fetch(url)
      return response.ok
    },
    loadPublicData: async (serviceUrl) => {
      const url = new URL('/api/v1/version', serviceUrl)
      const response = await fetch(url)
      const data = await response.json()
      const version = v.parse(VersionSchema, data)
      return {
        data: version,
        version: version.version,
      }
    },
    repo: { name: 'forgejo/forgejo', vcs: 'codeberg' },
  },
} satisfies DataLoader<'forgejo', ForgejoVersion>
