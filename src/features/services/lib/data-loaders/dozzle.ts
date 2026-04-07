import { fetch } from 'expo/fetch'
import * as v from 'valibot'
import { LeadingVSemanticVersionSchema } from '@/lib/schemas'
import { compareSemanticVersions } from '../../util'
import { DataLoader } from './types'

const VersionResponseSchema = v.pipe(
  v.string(),
  v.transform((s) => {
    // The response from Dozzle is wrapped in <pre>
    const m = s.match(/^<pre\b[^>]*>([\s\S]*)<\/pre>$/i)
    console.log('m', m)
    return m ? m[1] : s
  }),
  LeadingVSemanticVersionSchema,
)
const ReleasesResponseSchema = v.array(
  v.object({
    body: v.string(),
    breaking: v.number(),
    bugFixes: v.number(),
    createdAt: v.pipe(v.string(), v.isoTimestamp()),
    features: v.number(),
    htmlUrl: v.pipe(v.string(), v.url()),
    latest: v.boolean(),
    name: v.string(),
    tag: LeadingVSemanticVersionSchema,
  }),
)

export type DozzleVersion = v.InferOutput<typeof VersionResponseSchema>

export const dozzle = {
  dozzle: {
    checkForUpdates: async (serviceUrl, version) => {
      const url = new URL('/api/releases', serviceUrl)
      const response = await fetch(url)
      const data = await response.json()
      const releases = v.parse(ReleasesResponseSchema, data)
      const newerVersions = releases.filter(
        (release) => compareSemanticVersions(version, release.tag) < 0,
      )
      const hasUpdate = newerVersions.length > 0
      const changelog = newerVersions
        .reduce((acc, release) => {
          let str = `<h1>${release.name}</h1>`
          str += release.body
          acc.push(str)
          return acc
        }, [] as string[])
        .join('<br><br>')
      const latest = releases[0]

      if (hasUpdate) {
        return {
          changelog,
          hasUpdate,
          link: latest.htmlUrl,
          newVersion: latest.tag,
          releaseTimestamp: latest.createdAt,
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
      const url = new URL('/api/version', serviceUrl)
      const response = await fetch(url)
      const data = await response.text()
      const version = v.parse(VersionResponseSchema, data)
      return {
        data: version,
        version,
      }
    },
  },
} satisfies DataLoader<'dozzle', DozzleVersion>
