import { SemanticVersion } from '@/lib/schemas'
import { Version } from '@/lib/types'
import { ServiceUrl } from '../service.schema'
import { BuiltInServiceId } from '../services.system'

export type DataLoader<
  Id extends BuiltInServiceId,
  PublicData extends object,
  SecretData = unknown,
  Credentials = unknown,
> = Partial<Record<Id, LoaderEntry<PublicData, SecretData, Credentials>>>

export type LoaderEntry<PublicData, SecretData, Credentials> = {
  /**
   * Set this, if there is a preferred way to check for updates instead of using the VCS.
   * Can be useful, if the service has endpoints for checking for updates.
   */
  checkForUpdates?: (
    serviceUrl: ServiceUrl,
    version: SemanticVersion,
  ) => Promise<UpdateData | { hasUpdate: false }>
  /**
   * Returns true if the service is healthy
   */
  checkHealth: (serviceUrl: ServiceUrl) => Promise<boolean>
  loadPublicData: (serviceUrl: ServiceUrl) => Promise<{
    data: PublicData
    version: Version
  }>
  loadSecretData?: (credentials: Credentials) => Promise<SecretData>
  /** Used for checking for updates */
  repo?: {
    name: string
    /** Version Control System */
    vcs: 'codeberg' | 'github'
  }
}

export type UpdateData = {
  changelog?: string
  hasUpdate: true
  link?: string
  newVersion: SemanticVersion
  releaseTimestamp?: string
}
