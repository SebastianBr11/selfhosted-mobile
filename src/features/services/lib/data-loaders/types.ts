import { SemanticVersion } from '@/lib/schemas'
import { ServiceUrl } from '../service.schema'
import { BuiltInServiceId } from '../services.system'

export type DataLoader<
  Id extends BuiltInServiceId,
  PublicData extends object,
  SecretData = unknown,
  Credentials = unknown,
> = Record<Id, LoaderEntry<PublicData, SecretData, Credentials>>

export type LoaderEntry<PublicData, SecretData, Credentials> =
  | undefined
  | {
      loadPublicData: (serviceUrl: ServiceUrl) => Promise<{
        data: PublicData
        version: SemanticVersion
      }>
      loadSecretData?: (credentials: Credentials) => Promise<SecretData>
    }
