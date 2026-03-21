import * as v from 'valibot'
import { UrlSchema } from './schemas'

export const ServiceIdSchema = v.pipe(
  v.string(),
  v.metadata({
    title: 'Service ID',
    description: 'A unique identifier for the service',
  }),
)
export const BuiltInServiceIdSchema = (builtInServiceIds: string[]) =>
  v.pipe(ServiceIdSchema, v.examples(builtInServiceIds))
export const ServiceNameSchema = v.pipe(
  v.string(),
  v.metadata({
    title: 'Service Name',
    description: 'The name of the service',
  }),
)
export const ServiceDescriptionSchema = v.pipe(
  v.string(),
  v.metadata({
    title: 'Service Description',
    description: 'A short description of the service',
  }),
)
export const ServiceAppStoreLinkSchema = v.pipe(
  v.union([UrlSchema, v.array(v.object({ name: v.string(), url: UrlSchema }))]),
  v.metadata({
    title: 'App store link',
    description:
      "Either a link to the app's page in the app store or an array of links with names",
  }),
)
export const ServicePackageNameSchema = v.pipe(
  v.string(),
  v.metadata({
    title: 'Android app package name',
    description: 'The package name of the Android app',
    examples: ['com.audiobookshelf.app'],
  }),
)
export const ServiceIconUrlSchema = v.pipe(
  v.union([
    UrlSchema,
    v.pipe(
      v.object({ light: UrlSchema, dark: UrlSchema }),
      v.metadata({
        description: 'An icon URL for light and dark mode',
      }),
    ),
  ]),
  v.metadata({
    description:
      'Either a URL to an icon or an object with light and dark mode icons',
  }),
)

export const ServiceSchema = v.object({
  id: ServiceIdSchema,
  name: ServiceNameSchema,
  url: UrlSchema,
  description: ServiceDescriptionSchema,
  appStoreLink: v.optional(ServiceAppStoreLinkSchema),
  packageName: v.optional(ServicePackageNameSchema),
  iconUrl: ServiceIconUrlSchema,
})
export type Service = v.InferOutput<typeof ServiceSchema>
export type ServiceId = Service['id']
export type ServiceName = Service['name']
export type ServiceUrl = Service['url']
export type ServiceDescription = Service['description']
export type ServiceAppStoreLink = Service['appStoreLink']
export type ServiceIconUrl = Service['iconUrl']

export function createUserInputSchema(validIds: Set<string>) {
  return v.object({
    services: v.array(
      v.pipe(
        v.pipe(
          v.object({
            id: BuiltInServiceIdSchema([...validIds]),
            name: v.optional(ServiceNameSchema),
            url: UrlSchema,
            description: v.optional(ServiceDescriptionSchema),
            appStoreLink: v.optional(ServiceAppStoreLinkSchema),
            packageName: v.optional(ServicePackageNameSchema),
            iconUrl: v.optional(ServiceIconUrlSchema),
          }),
          v.metadata({
            title: 'Service',
            description:
              'When using IDs from built-in services, you only have to provide a URL, the other options are optional and when used, will overide the defaults.',
          }),
        ),
        v.check((input) => {
          // If any field is missing, the ID must be a built-in one
          if (!input.description || !input.appStoreLink || !input.iconUrl) {
            return validIds.has(input.id)
          }
          return true
        }, 'Description, App store link and icon URL are required for custom products.'),
      ),
    ),
  })
}
