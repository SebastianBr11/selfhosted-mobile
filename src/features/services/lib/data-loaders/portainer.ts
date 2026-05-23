import { fetch } from 'expo/fetch'
import * as v from 'valibot'
import { SemanticVersionSchema } from '@/lib/schemas'
import { DataLoader } from './types'

const StatusSchema = v.object({
  InstanceID: v.string(),
  Version: SemanticVersionSchema,
})

export type PortainerStatus = v.InferOutput<typeof StatusSchema>

export const portainer = {
  portainer: {
    checkHealth: async (serviceUrl) => {
      const url = new URL('/api/system/status', serviceUrl)
      const response = await fetch(url)
      return response.ok
    },
    loadPublicData: async (serviceUrl) => {
      const url = new URL('/api/system/status', serviceUrl)
      const response = await fetch(url)
      const data = await response.json()
      const status = v.parse(StatusSchema, data)
      return {
        data: status,
        version: status.Version,
      }
    },
    repo: { name: 'portainer/portainer', vcs: 'github' },
  },
} satisfies DataLoader<'portainer', PortainerStatus>
