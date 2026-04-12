import { fetch } from 'expo/fetch'
import * as v from 'valibot'
import { SemanticVersionSchema } from '@/lib/schemas'
import { DataLoader } from './types'

const AboutSchema = v.object({
  allowPasswordLogin: v.boolean(),
  demoStatus: v.boolean(),
  enableOidc: v.boolean(),
  oidcProviderName: v.string(),
  oidcRedirect: v.boolean(),
  production: v.boolean(),
  version: v.union([v.literal('nightly'), SemanticVersionSchema]),
})

export type MealieAbout = v.InferOutput<typeof AboutSchema>

export const mealie = {
  mealie: {
    checkHealth: async (serviceUrl) => {
      const url = new URL('/api/app/about', serviceUrl)
      const response = await fetch(url)
      return response.ok
    },
    loadPublicData: async (serviceUrl) => {
      const url = new URL('/api/app/about', serviceUrl)
      const response = await fetch(url)
      const data = await response.json()
      const about = v.parse(AboutSchema, data)
      return {
        data: about,
        version: about.version,
      }
    },
    repo: { name: 'mealie-recipes/mealie', vcs: 'github' },
  },
} satisfies DataLoader<'mealie', MealieAbout>
