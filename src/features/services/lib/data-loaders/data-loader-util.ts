import { fetch } from 'expo/fetch'
import * as v from 'valibot'
import { LeadingVSemanticVersionSchema, UrlSchema } from '@/lib/schemas'

const GithubReleaseSchema = v.object({
  body: v.string(),
  html_url: UrlSchema,
  id: v.number(),
  name: v.string(),
  published_at: v.pipe(v.string(), v.isoTimestamp()),
  tag_name: LeadingVSemanticVersionSchema,
})
const GithubReleasesSchema = v.array(GithubReleaseSchema)

export async function fetchGithubReleases(repo: string) {
  const data = await fetch(`https://api.github.com/repos/${repo}/releases`)
  return v.parse(GithubReleasesSchema, await data.json())
}
