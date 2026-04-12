import { fetch } from 'expo/fetch'
import * as v from 'valibot'
import { LeadingVSemanticVersionSchema } from '@/lib/schemas'
import { DataLoader } from './types'

const HealthcheckSchema = v.object({
  data: v.object({
    message: v.string(),
    version: LeadingVSemanticVersionSchema,
  }),
  status: v.number(),
})

export type GrimmoryHealthcheck = v.InferOutput<typeof HealthcheckSchema>

export const grimmory = {
  grimmory: {
    checkHealth: async (serviceUrl) => {
      const url = new URL('/api/v1/healthcheck', serviceUrl)
      const response = await fetch(url)
      return response.ok
    },
    loadPublicData: async (serviceUrl) => {
      const url = new URL('/api/v1/healthcheck', serviceUrl)
      const response = await fetch(url)
      const data = await response.json()
      const healthcheck = v.parse(HealthcheckSchema, data)
      return {
        data: healthcheck,
        version: healthcheck.data.version,
      }
    },
    repo: { name: 'grimmory-tools/grimmory', vcs: 'github' },
  },
} satisfies DataLoader<'grimmory', GrimmoryHealthcheck>
