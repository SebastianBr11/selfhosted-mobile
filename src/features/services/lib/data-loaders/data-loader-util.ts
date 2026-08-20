import { fetch } from 'expo/fetch'
import * as v from 'valibot'
import {
  LeadingVSemanticVersionSchema,
  OtherVersionSchema,
  SemanticVersion,
  SemanticVersionSchema,
  UrlSchema,
} from '@/lib/schemas'
import { getDataLoader, hasDataLoader } from '.'
import { compareVersions } from '../../util'
import { Service } from '../service.schema'
import { isBuiltInServiceId } from '../services-util'
import { CupData } from './cup'
import { UpdateCheck } from './types'

const GithubReleaseSchema = v.object({
  body: v.string(),
  html_url: UrlSchema,
  id: v.number(),
  name: v.string(),
  prerelease: v.boolean(),
  published_at: v.pipe(v.string(), v.isoTimestamp()),
  tag_name: v.union([
    SemanticVersionSchema,
    LeadingVSemanticVersionSchema,
    OtherVersionSchema,
  ]),
})
const GithubReleasesSchema = v.array(GithubReleaseSchema)

const CodebergReleaseSchema = v.object({
  body: v.string(),
  html_url: UrlSchema,
  id: v.number(),
  name: v.string(),
  prerelease: v.boolean(),
  published_at: v.pipe(v.string(), v.isoTimestamp()),
  tag_name: v.union([
    SemanticVersionSchema,
    LeadingVSemanticVersionSchema,
    OtherVersionSchema,
  ]),
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
    includePreleaseVersions: boolean,
  ): Promise<UpdateCheck> => {
    const releases = await fetchCodebergReleases(repoName)
    let filteredReleases
    if (includePreleaseVersions) {
      filteredReleases = releases
    } else {
      filteredReleases = releases.filter((release) => !release.prerelease)
    }
    const newerVersions = filteredReleases.filter(
      (release) => compareVersions(currentVersion, release.tag_name) < 0,
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
    const latest = filteredReleases[0]

    if (hasUpdate) {
      return {
        changelog,
        hasUpdate,
        link: latest.html_url,
        newVersion: latest.tag_name,
        releaseTimestamp: latest.published_at,
        type: 'generic',
      }
    }
    return { hasUpdate }
  },
  checkGithubForUpdates: async (
    repoName: string,
    currentVersion: SemanticVersion,
    includePreleaseVersions: boolean,
  ): Promise<UpdateCheck> => {
    const releases = await fetchGithubReleases(repoName)
    let filteredReleases
    if (includePreleaseVersions) {
      filteredReleases = releases
    } else {
      filteredReleases = releases.filter((release) => !release.prerelease)
    }
    const newerVersions = filteredReleases.filter(
      (release) => compareVersions(currentVersion, release.tag_name) < 0,
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
    const latest = filteredReleases[0]

    if (hasUpdate) {
      return {
        changelog,
        hasUpdate,
        link: latest.html_url,
        newVersion: latest.tag_name,
        releaseTimestamp: latest.published_at,
        type: 'generic',
      }
    }
    return { hasUpdate }
  },
  checkServiceUpdatesUsingCup: (
    service: Service,
    cupData: CupData,
  ): UpdateCheck => {
    let baseFilter = (image: CupData['images'][number]) =>
      image.parts.repository.toLowerCase().includes(service.id.toLowerCase()) ||
      image.url?.toLowerCase().includes(service.id.toLowerCase())
    let imageFilter = baseFilter

    if (isBuiltInServiceId(service.id) && hasDataLoader(service.id)) {
      const serviceLoader = getDataLoader(service.id)
      if ('repo' in serviceLoader) {
        imageFilter = (image) =>
          image.parts.repository.toLowerCase() ===
            serviceLoader.repo?.name.toLowerCase() || baseFilter(image)
      }
    }

    const serviceImages = cupData.images.filter(imageFilter)
    const inUseServiceImages = serviceImages.filter((image) => image.in_use)
    if (inUseServiceImages.length < 1) {
      return { hasUpdate: false }
    }
    const usedImage = inUseServiceImages[0]
    if (usedImage.result.has_update && usedImage.result.info) {
      return {
        hasUpdate: true,
        info: usedImage.result.info,
        otherData: {
          version: usedImage.parts.tag,
        },
        type: 'cup',
      }
    }
    return {
      hasUpdate: false,
      otherData: {
        version: usedImage.parts.tag,
      },
    }
  },
}
