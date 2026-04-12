import { fetch } from 'expo/fetch'
import * as v from 'valibot'
import { SemanticVersionSchema } from '@/lib/schemas'
import { DataLoader } from './types'

const VersionSchema = SemanticVersionSchema

export type VaultwardenVersion = v.InferOutput<typeof VersionSchema>

export const vaultwarden = {
  vaultwarden: {
    checkHealth: async (serviceUrl) => {
      const url = new URL('/api/alive', serviceUrl)
      const response = await fetch(url)
      return response.ok
    },
    loadPublicData: async (serviceUrl) => {
      const url = new URL('/api/version', serviceUrl)
      const response = await fetch(url)
      const data = await response.json()
      const version = v.parse(VersionSchema, data)
      return {
        data: version,
        version,
      }
    },
    repo: { name: 'dani-garcia/vaultwarden', vcs: 'github' },
  },
} satisfies DataLoader<'vaultwarden', VaultwardenVersion>
