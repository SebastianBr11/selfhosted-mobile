import { fetch } from 'expo/fetch'
import * as v from 'valibot'
import {
  LeadingVSemanticVersionSchema,
  SemanticVersion,
  SemanticVersionSchema,
  UrlSchema,
} from '@/lib/schemas'
import { compareSemanticVersions } from '../../util'
import { UpdateData } from './types'

const GithubReleaseSchema = v.object({
  body: v.string(),
  html_url: UrlSchema,
  id: v.number(),
  name: v.string(),
  published_at: v.pipe(v.string(), v.isoTimestamp()),
  tag_name: LeadingVSemanticVersionSchema,
})
const GithubReleasesSchema = v.array(GithubReleaseSchema)

const CodebergReleaseSchema = v.object({
  body: v.string(),
  html_url: UrlSchema,
  id: v.number(),
  name: v.string(),
  published_at: v.pipe(v.string(), v.isoTimestamp()),
  tag_name: v.union([LeadingVSemanticVersionSchema, SemanticVersionSchema]),
})
const CodebergReleasesSchema = v.array(CodebergReleaseSchema)

export async function fetchCodebergReleases(repo: string) {
  const data = await fetch(`https://codeberg.org/api/v1/repos/${repo}/releases`)
  return v.parse(CodebergReleasesSchema, await data.json())
}

export async function fetchGithubReleases(repo: string) {
  const data = await fetch(`https://api.github.com/repos/${repo}/releases`)
  return v.parse(GithubReleasesSchema, await data.json())
}

export const dataLoaderUtil = {
  checkCodebergForUpdates: async (
    repoName: string,
    currentVersion: SemanticVersion,
  ) => {
    const releases = await fetchCodebergReleases(repoName)
    const newerVersions = releases.filter(
      (release) =>
        compareSemanticVersions(currentVersion, release.tag_name) < 0,
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
      } satisfies UpdateData
    }
    return { hasUpdate }
  },
  checkGithubForUpdates: async (
    repoName: string,
    currentVersion: SemanticVersion,
  ) => {
    const releases = await fetchGithubReleases(repoName)
    const newerVersions = releases.filter(
      (release) =>
        compareSemanticVersions(currentVersion, release.tag_name) < 0,
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
      } satisfies UpdateData
    }
    return { hasUpdate }
  },
}
