import { fetch } from 'expo/fetch'
import * as v from 'valibot'
import { SemanticVersionSchema } from '@/lib/schemas'
import { DataLoader } from './types'

const StatusSchema = v.object({
  updateAvailable: v.boolean(),
  version: SemanticVersionSchema,
})

export type SeerrStatus = v.InferOutput<typeof StatusSchema>

export const seerr = {
  seerr: {
    checkHealth: async (serviceUrl) => {
      const url = new URL('/api/v1/status', serviceUrl)
      const response = await fetch(url)
      return response.ok
    },
    loadPublicData: async (serviceUrl) => {
      const url = new URL('/api/v1/status', serviceUrl)
      const response = await fetch(url)
      const data = await response.json()
      const status = v.parse(StatusSchema, data)
      return {
        data: status,
        version: status.version,
      }
    },
    repo: { name: 'seerr-team/seerr', vcs: 'github' },
  },
} satisfies DataLoader<'seerr', SeerrStatus>
