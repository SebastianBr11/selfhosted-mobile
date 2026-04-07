import { fetch } from 'expo/fetch'
import * as v from 'valibot'
import { SemanticVersionSchema, setFromArray } from '@/lib/schemas'
import { compareSemanticVersions } from '../../util'
import { fetchGithubReleases } from './data-loader-util'
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
    checkForUpdates: async (_serviceUrl, version) => {
      const releases = await fetchGithubReleases('advplyr/audiobookshelf')
      const newerVersions = releases.filter(
        (release) => compareSemanticVersions(version, release.tag_name) < 0,
      )
      const hasUpdate = newerVersions.length > 0
      const changelog = newerVersions
        .reduce((acc, release) => {
          let str = `# ${release.name}\n`
          str += release.body
          acc.push(str)
          return acc
        }, [] as string[])
        .join('\n\n')
      const latest = releases[0]

      if (hasUpdate) {
        return {
          changelog,
          hasUpdate,
          link: latest.html_url,
          newVersion: latest.tag_name,
          releaseTimestamp: latest.published_at,
        }
      }
      return { hasUpdate }
    },
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
