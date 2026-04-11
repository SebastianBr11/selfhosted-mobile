import { fetch } from 'expo/fetch'
import * as v from 'valibot'
import { SemanticVersionSchema } from '@/lib/schemas'
import { DataLoader } from './types'

const HeartbeatSchema = v.object({
  FILESYSTEM: v.object({
    FS_PLATFORMS: v.array(v.string()),
  }),
  OIDC: v.object({
    AUTOLOGIN: v.boolean(),
    ENABLED: v.boolean(),
    PROVIDER: v.string(),
  }),
  SYSTEM: v.object({
    SHOW_SETUP_WIZARD: v.boolean(),
    VERSION: SemanticVersionSchema,
  }),
})

export type RommHeartbeat = v.InferOutput<typeof HeartbeatSchema>

export const romm = {
  romm: {
    checkHealth: async (serviceUrl) => {
      const url = new URL('/', serviceUrl)
      const response = await fetch(url)
      return response.ok
    },
    loadPublicData: async (serviceUrl) => {
      const url = new URL('/api/heartbeat', serviceUrl)
      const response = await fetch(url)
      const data = await response.json()
      const heartbeat = v.parse(HeartbeatSchema, data)
      return {
        data: heartbeat,
        version: heartbeat.SYSTEM.VERSION,
      }
    },
    repo: { name: 'rommapp/romm', vcs: 'github' },
  },
} satisfies DataLoader<'romm', RommHeartbeat>
