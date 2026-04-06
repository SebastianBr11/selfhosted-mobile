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
      checkForUpdates?: (
        serviceUrl: ServiceUrl,
        version: SemanticVersion,
        cupUrl?: string,
      ) => Promise<
        | {
            changelog?: string
            hasUpdate: true
            newVersion: SemanticVersion
            updateUrl?: string
          }
        | { hasUpdate: false }
      >
      /**
       * Returns true if the service is healthy
       */
      checkHealth: (serviceUrl: ServiceUrl) => Promise<boolean>
      loadPublicData: (serviceUrl: ServiceUrl) => Promise<{
        data: PublicData
        version: SemanticVersion
      }>
      loadSecretData?: (credentials: Credentials) => Promise<SecretData>
    }
