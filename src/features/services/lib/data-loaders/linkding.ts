import { fetch } from 'expo/fetch'
import * as v from 'valibot'
import { SemanticVersionSchema } from '@/lib/schemas'
import { DataLoader } from './types'

const HealthSchema = v.object({
  status: v.fallback(v.picklist(['healthy', 'unhealthy']), 'unhealthy'),
  version: SemanticVersionSchema,
})

export type LinkdingHealth = v.InferOutput<typeof HealthSchema>

export const linkding = {
  checkHealth: async (serviceUrl) => {
    const url = new URL('/health', serviceUrl)
    const response = await fetch(url)
    return response.ok
  },
  loadPublicData: async (serviceUrl) => {
    const url = new URL('/health', serviceUrl)
    const response = await fetch(url)
    const data = await response.json()
    const health = v.parse(HealthSchema, data)
    return {
      data: health,
      version: health.version,
    }
  },
  repo: {
    name: 'sissbruecker/linkding',
    vcs: 'github',
  },
  serviceId: 'linkding',
} as const satisfies DataLoader<'linkding', LinkdingHealth>
