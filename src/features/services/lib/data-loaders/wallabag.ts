import { fetch } from 'expo/fetch'
import * as v from 'valibot'
import { SemanticVersionSchema } from '@/lib/schemas'
import { DataLoader } from './types'

const InfoSchema = v.object({
  allowed_registration: v.boolean(),
  appname: v.string(),
  version: SemanticVersionSchema,
})

export type WallabagInfo = v.InferOutput<typeof InfoSchema>

export const wallabag = {
  wallabag: {
    checkHealth: async (serviceUrl) => {
      const url = new URL('/api/info', serviceUrl)
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
        version: info.version,
      }
    },
    repo: { name: 'wallabag/wallabag', vcs: 'github' },
  },
} satisfies DataLoader<'wallabag', WallabagInfo>
