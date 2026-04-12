import { fetch } from 'expo/fetch'
import * as v from 'valibot'
import { SemanticVersionSchema, UrlSchema } from '@/lib/schemas'
import { DataLoader } from './types'

// Schema from https://github.com/jellyfin/jellyfin/blob/044cf9f/MediaBrowser.Model/System/PublicSystemInfo.cs
const InfoSchema = v.object({
  Id: v.string(),
  LocalAddress: UrlSchema,
  ProductName: v.string(),
  ServerName: v.string(),
  StartupWizardCompleted: v.boolean(),
  Version: SemanticVersionSchema,
})

export type JellyfinInfo = v.InferOutput<typeof InfoSchema>

export const jellyfin = {
  jellyfin: {
    checkHealth: async (serverUrl) => {
      const url = new URL('/health', serverUrl)
      const response = await fetch(url)
      return response.ok
    },
    loadPublicData: async (serverUrl) => {
      const url = new URL('/System/Info/Public', serverUrl)
      const response = await fetch(url)
      const data = await response.json()
      const info = v.parse(InfoSchema, data)
      return {
        data: info,
        version: info.Version,
      }
    },
    repo: { name: 'jellyfin/jellyfin', vcs: 'github' },
  },
} satisfies DataLoader<'jellyfin', JellyfinInfo>
