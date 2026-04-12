import { fetch } from 'expo/fetch'
import * as v from 'valibot'
import { SemanticVersionSchema } from '@/lib/schemas'
import { DataLoader } from './types'

const ProfileSchema = v.object({
  demo: v.boolean(),
  version: SemanticVersionSchema,
})

export type MemosInstanceProfile = v.InferOutput<typeof ProfileSchema>

export const memos = {
  memos: {
    checkHealth: async (serviceUrl) => {
      const url = new URL('/api/v1/instance/profile', serviceUrl)
      const response = await fetch(url)
      return response.ok
    },
    loadPublicData: async (serviceUrl) => {
      const url = new URL('/api/v1/instance/profile', serviceUrl)
      const response = await fetch(url)
      const data = await response.json()
      const about = v.parse(ProfileSchema, data)
      return {
        data: about,
        version: about.version,
      }
    },
    repo: { name: 'usememos/memos', vcs: 'github' },
  },
} satisfies DataLoader<'memos', MemosInstanceProfile>
