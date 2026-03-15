import { AssertExactlyAllIdsPresent } from '@/util/types'
import * as v from 'valibot'
import { UrlSchema } from './schemas'

const builtInServiceIds = ['audiobookshelf', 'cup'] as const

export const serviceSystem = createServiceSystem([
  {
    id: 'audiobookshelf',
    url: 'https://www.audiobookshelf.org/',
    description: 'Self-hosted audiobook and podcast server',
    appStoreLink:
      'https://play.google.com/store/apps/details?id=com.audiobookshelf.app',
    iconUrl: 'https://www.audiobookshelf.org/Logo.png',
  },
  {
    id: 'cup',
    url: 'https://cup.sergi0g.dev/',
    description: 'Cup',
    iconUrl: 'https://cup.sergi0g.dev/favicon.svg',
  },
])

const BuiltInServiceIdSchema = v.picklist(builtInServiceIds)
type BuiltInServiceId = v.InferOutput<typeof BuiltInServiceIdSchema>

const ServiceSchema = v.object({
  id: v.string(),
  url: UrlSchema,
  description: v.string(),
  appStoreLink: v.optional(UrlSchema),
  iconUrl: UrlSchema,
})
export type Service = v.InferOutput<typeof ServiceSchema>

function createUserInputSchema(validIds: Set<string>) {
  return v.pipe(
    v.object({
      id: v.string(),
      url: UrlSchema,
      description: v.optional(v.string()),
      appStoreLink: v.optional(UrlSchema),
      iconUrl: v.optional(UrlSchema),
    }),
    v.check((input) => {
      // If any field is missing, the ID must be a built-in one
      if (!input.description || !input.appStoreLink || !input.iconUrl) {
        return validIds.has(input.id)
      }
      return true
    }, 'Description, App store link and icon URL are required for custom products.'),
  )
}

function createServiceSystem<const T extends readonly Service[] = Service[]>(
  builtIns: T & AssertExactlyAllIdsPresent<T, BuiltInServiceId>,
) {
  // Map for fast lookups
  const defaultMap = new Map(builtIns.map((service) => [service.id, service]))

  const UserInputSchema = createUserInputSchema(new Set(defaultMap.keys()))

  return {
    builtIns,
    parse: (data: unknown) => {
      const parsed = v.safeParse(v.array(UserInputSchema), data)
      if (!parsed.success) return parsed
      return {
        ...parsed,
        output: parsed.output.map((item) => {
          const defaults = defaultMap.get(item.id)
          return {
            id: item.id,
            url: item.url,
            description: item.description ?? defaults?.description!,
            appStoreLink: item.appStoreLink ?? defaults?.appStoreLink!,
            iconUrl: item.iconUrl ?? defaults?.iconUrl!,
          } satisfies T[number]
        }),
      }
    },
  }
}
