import { fetch } from 'expo/fetch'
import * as v from 'valibot'
import { SemanticVersionSchema } from '@/lib/schemas'
import { DataLoader } from './types'

const VersionSchema = v.pipe(
  v.object({
    major: v.number(),
    minor: v.number(),
    patch: v.number(),
  }),
  v.transform(({ major, minor, patch }) => `${major}.${minor}.${patch}`),
  SemanticVersionSchema,
)

export type ImmichVersion = v.InferOutput<typeof VersionSchema>

export const immich = {
  immich: {
    checkHealth: async (serviceUrl) => {
      const url = new URL('/api/server/ping', serviceUrl)
      const response = await fetch(url)
      return response.ok
    },
    loadPublicData: async (serviceUrl) => {
      const url = new URL('/api/server/version', serviceUrl)
      const response = await fetch(url)
      const data = await response.json()
      const version = v.parse(VersionSchema, data)
      return {
        data: version,
        version: version,
      }
    },
    repo: { name: 'immich-app/immich', vcs: 'github' },
  },
} satisfies DataLoader<'immich', ImmichVersion>
