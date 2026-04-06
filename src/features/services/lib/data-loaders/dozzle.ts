import { fetch } from 'expo/fetch'
import * as v from 'valibot'
import {
  LeadingVSemanticVersionSchema,
  SemanticVersionSchema,
} from '@/lib/schemas'
import { DataLoader } from './types'

const VersionResponseSchema = LeadingVSemanticVersionSchema

export type DozzleVersion = v.InferOutput<typeof VersionResponseSchema>

export const dozzle = {
  dozzle: {
    loadPublicData: async (serviceUrl) => {
      const url = new URL('/api/version', serviceUrl)
      const response = await fetch(url, { credentials: 'include' })
      const data = await response.json()
      const version = v.parse(VersionResponseSchema, data)
      return {
        data: version,
        version,
      }
    },
  },
} satisfies DataLoader<'dozzle', DozzleVersion>
