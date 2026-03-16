import * as v from 'valibot'
import { UrlSchema } from './schemas'

export const ServiceIdSchema = v.string()
export const ServiceNameSchema = v.string()
export const ServiceDescriptionSchema = v.string()
export const ServiceAppStoreLinkSchema = v.union([
  UrlSchema,
  v.array(v.object({ name: v.string(), url: UrlSchema })),
])
export const ServicePackageNameSchema = v.string()
export const ServiceIconUrlSchema = v.union([
  UrlSchema,
  v.object({ light: UrlSchema, dark: UrlSchema }),
])

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
  return v.pipe(
    v.object({
      id: ServiceIdSchema,
      name: v.optional(ServiceNameSchema),
      url: UrlSchema,
      description: v.optional(ServiceDescriptionSchema),
      appStoreLink: v.optional(ServiceAppStoreLinkSchema),
      packageName: v.optional(ServicePackageNameSchema),
      iconUrl: v.optional(ServiceIconUrlSchema),
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
