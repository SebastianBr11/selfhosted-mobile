import { fetch } from 'expo/fetch'
import * as v from 'valibot'
import { SemanticVersionSchema, setFromArray } from '@/lib/schemas'
import { DataLoader } from './types'

const StatusResponseSchema = v.object(
  {
    authFormData: v.object({
      authLoginCustomMessage: v.nullish(v.string()),
      authOpenIDAutoLaunch: v.nullish(v.boolean()),
      authOpenIDButtonText: v.nullish(v.string()),
    }),
    authMethods: setFromArray(
      v.union([v.literal('local'), v.literal('openid')]),
    ),
    isInit: v.boolean(),
    serverVersion: SemanticVersionSchema,
  },
  'Unexpected server format',
)

export type AudiobookshelfStatus = v.InferOutput<typeof StatusResponseSchema>

export const audiobookshelf = {
  audiobookshelf: {
    checkHealth: async (serviceUrl) => {
      const url = new URL('/healthcheck', serviceUrl)
      const response = await fetch(url)
      return response.ok
    },
    loadPublicData: async (serviceUrl) => {
      const url = new URL('/status', serviceUrl)
      const response = await fetch(url)
      const data = await response.json()
      const status = v.parse(StatusResponseSchema, data)
      return {
        data: status,
        version: status.serverVersion,
      }
    },
  },
} satisfies DataLoader<'audiobookshelf', AudiobookshelfStatus>
