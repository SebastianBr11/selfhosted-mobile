import { fetch } from 'expo/fetch'
import * as v from 'valibot'
import { LeadingVSemanticVersionSchema } from '@/lib/schemas'
import { DataLoader } from './types'

const ConfigSchema = v.object({
  onboarding_complete: v.boolean(),
  release_version: LeadingVSemanticVersionSchema,
})

export type ShelfmarkConfig = v.InferOutput<typeof ConfigSchema>

export const shelfmark = {
  shelfmark: {
    checkHealth: async (serviceUrl) => {
      const url = new URL('/api/status', serviceUrl)
      const response = await fetch(url)
      return response.ok
    },
    loadPublicData: async (serviceUrl) => {
      const url = new URL('/api/config', serviceUrl)
      const response = await fetch(url)
      const data = await response.json()
      const config = v.parse(ConfigSchema, data)
      return {
        data: config,
        version: config.release_version,
      }
    },
    repo: { name: 'calibrain/shelfmark', vcs: 'github' },
  },
} satisfies DataLoader<'shelfmark', ShelfmarkConfig>
