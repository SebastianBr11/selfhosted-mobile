import { fetch } from 'expo/fetch'
import * as v from 'valibot'
import {
  ContainerTag,
  ContainerTagSchema,
  LeadingVSemanticVersionSchema,
  SemanticVersionSchema,
} from '@/lib/schemas'
import { DataLoader } from './types'

const CupVersionInfoSchema = v.object({
  current_version: ContainerTagSchema,
  new_tag: ContainerTagSchema,
  new_version: ContainerTagSchema,
  type: v.literal('version'),
  version_update_type: v.picklist(['patch', 'minor', 'major']),
})
export type CupVersionInfo = v.InferOutput<typeof CupVersionInfoSchema>
const CupDigestInfoSchema = v.object({
  local_digests: v.array(v.string()),
  remote_digest: v.string(),
  type: v.literal('digest'),
})
export type CupDigestInfo = v.InferOutput<typeof CupDigestInfoSchema>
const CupImageSchema = v.object({
  in_use: v.nullable(v.boolean()),
  parts: v.object({
    registry: v.string(),
    repository: v.string(),
    tag: ContainerTagSchema,
  }),
  reference: v.string(),
  result: v.object({
    error: v.nullable(v.string()),
    has_update: v.nullable(v.boolean()),
    info: v.nullable(
      v.variant('type', [CupVersionInfoSchema, CupDigestInfoSchema]),
    ),
  }),
  server: v.nullable(v.string()),
  time: v.number(),
  url: v.nullable(v.string()),
})
const CupDataSchema = v.object({
  images: v.array(CupImageSchema),
  last_updated: v.string(),
  metrics: v.object({
    major_updates: v.number(),
    minor_updates: v.number(),
    monitored_images: v.number(),
    other_updates: v.number(),
    patch_updates: v.number(),
    unknown: v.number(),
    up_to_date: v.number(),
    updates_available: v.number(),
  }),
})

export type CupData = v.InferOutput<typeof CupDataSchema>

export type CupUpdateData = (
  | {
      hasUpdate: false
    }
  | {
      hasUpdate: true
      info: CupDigestInfo | CupVersionInfo
      type: 'cup'
    }
) & {
  otherData: {
    version?: ContainerTag
  }
}

export const cup = {
  checkHealth: async (serviceUrl) => {
    const url = new URL('/api/v3/json', serviceUrl)
    const response = await fetch(url)
    return response.ok
  },
  loadPublicData: async (serviceUrl) => {
    const url = new URL('/api/v3/json', serviceUrl)
    const response = await fetch(url)
    const data = await response.json()
    const cupData = v.parse(CupDataSchema, data)
    return {
      data: cupData,
      version: { raw: 'No version available', type: 'unavailable' },
    }
  },
  repo: { name: 'sergi0g/cup', vcs: 'github' },
  serviceId: 'cup',
} as const satisfies DataLoader<'cup', CupData>
