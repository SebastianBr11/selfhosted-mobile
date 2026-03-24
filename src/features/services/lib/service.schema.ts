import { t } from '@lingui/core/macro'
import * as v from 'valibot'
import { emptyMessage, stringMessage } from '../../../lib/schema-messages'
import { UrlSchema } from '../../../lib/schemas'

export const ServiceIdSchema = v.pipe(
  v.string(({ received }) => stringMessage('service ID', received)),
  v.nonEmpty(() => emptyMessage('service ID')),
  v.metadata({
    description: 'A unique identifier for the service',
    title: 'Service ID',
  }),
)
export const BuiltInServiceIdSchema = (builtInServiceIds: string[]) =>
  v.pipe(ServiceIdSchema, v.examples(builtInServiceIds))
export const ServiceNameSchema = v.pipe(
  v.string(({ received }) => stringMessage('service name', received)),
  v.nonEmpty(() => emptyMessage('service name')),
  v.metadata({
    description: 'The name of the service',
    title: 'Service Name',
  }),
)
export const ServiceDescriptionSchema = v.pipe(
  v.string(({ received }) => stringMessage('service description', received)),
  v.nonEmpty(() => emptyMessage('service description')),
  v.metadata({
    description: 'A short description of the service',
    title: 'Service Description',
  }),
)
export const ServiceAppStoreLinkSchema = v.pipe(
  v.union([UrlSchema, v.array(v.object({ name: v.string(), url: UrlSchema }))]),
  v.metadata({
    description:
      "Either a link to the app's page in the app store or an array of links with names",
    title: 'App store link',
  }),
)
export const ServicePackageNameSchema = v.pipe(
  v.string(({ received }) =>
    stringMessage('Android app package name', received),
  ),
  v.metadata({
    description: 'The package name of the Android app',
    examples: ['com.audiobookshelf.app'],
    title: 'Android app package name',
  }),
)
export const ServiceIconUrlSchema = v.pipe(
  v.union([
    UrlSchema,
    v.pipe(
      v.object({ dark: UrlSchema, light: UrlSchema }),
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
  appStoreLink: v.optional(ServiceAppStoreLinkSchema),
  description: ServiceDescriptionSchema,
  iconUrl: ServiceIconUrlSchema,
  id: ServiceIdSchema,
  name: ServiceNameSchema,
  packageName: v.optional(ServicePackageNameSchema),
  url: UrlSchema,
})
export type Service = v.InferOutput<typeof ServiceSchema>
export type ServiceAppStoreLink = Service['appStoreLink']
export type ServiceDescription = Service['description']
export type ServiceIconUrl = Service['iconUrl']
export type ServiceId = Service['id']
export type ServiceName = Service['name']
export type ServiceUrl = Service['url']

export function createUserInputSchema(validIds: Set<string>) {
  return v.object({
    services: v.array(
      v.pipe(
        v.pipe(
          v.object({
            appStoreLink: v.optional(ServiceAppStoreLinkSchema),
            description: v.optional(ServiceDescriptionSchema),
            iconUrl: v.optional(ServiceIconUrlSchema),
            id: BuiltInServiceIdSchema([...validIds]),
            name: v.optional(ServiceNameSchema),
            packageName: v.optional(ServicePackageNameSchema),
            url: UrlSchema,
          }),
          v.metadata({
            description:
              'When using IDs from built-in services, you only have to provide a URL, the other options are optional and when used, will overide the defaults.',
            title: 'Service',
          }),
        ),
        v.check(
          (input) => {
            // If any field is missing, the ID must be a built-in one
            if (!input.name || !input.description || !input.iconUrl) {
              return validIds.has(input.id)
            }
            return true
          },
          ({ input: { id } }) =>
            t`Unknown service ID "${id}". Service name, description and icon URL are required for custom services.`,
        ),
      ),
    ),
  })
}
