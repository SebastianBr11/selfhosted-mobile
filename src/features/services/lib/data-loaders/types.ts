import { SemanticVersion, Version } from '@/lib/schemas'
import { ServiceUrl } from '../service.schema'
import { BuiltInServiceId } from '../services.system'
import { CupUpdateData } from './cup'

export type DataLoader<
  Id extends BuiltInServiceId,
  PublicData extends object,
  SecretData = unknown,
  Credentials = unknown,
> = LoaderEntry<PublicData, SecretData, Credentials> & { serviceId: Id }

export type DataLoaders = {
  [Id in BuiltInServiceId]?: DataLoader<Id, object>
}

export type GenericUpdateData = {
  /** Changelog formatted as Markdown */
  changelog?: string
  hasUpdate: true
  /** URL to the latest version */
  link?: string
  newVersion: SemanticVersion
  otherData?: never
  releaseTimestamp?: string
  type: 'generic'
}

export type LoaderEntry<PublicData, SecretData, Credentials> = {
  /**
   * Set this, if there is a preferred way to check for updates instead of using the VCS.
   * Can be useful, if the service has endpoints for checking for updates.
   */
  checkForUpdates?: (
    serviceUrl: ServiceUrl,
    version: SemanticVersion,
  ) => Promise<UpdateCheck>
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

export type UpdateCheck =
  | CupUpdateData
  | GenericUpdateData
  | { hasUpdate: false; otherData?: never }

export type UpdateData =
  | Extract<CupUpdateData, { hasUpdate: true }>
  | GenericUpdateData
