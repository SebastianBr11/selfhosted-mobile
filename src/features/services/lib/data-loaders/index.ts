import { BuiltInServiceId } from '../services.system'
import { audiobookshelf } from './audiobookshelf'
import { cup } from './cup'
import { dozzle } from './dozzle'
import { forgejo } from './forgejo'
import { gitea } from './gitea'
import { grimmory } from './grimmory'
import { immich } from './immich'
import { jellyfin } from './jellyfin'
import { linkding } from './linkding'
import { mealie } from './mealie'
import { memos } from './memos'
import { portainer } from './portainer'
import { readeck } from './readeck'
import { romm } from './romm'
import { seerr } from './seerr'
import { shelfmark } from './shelfmark'
import { DataLoaders } from './types'
import { vaultwarden } from './vaultwarden'
import { wallabag } from './wallabag'

const dataLoaders = {
  audiobookshelf,
  cup,
  dozzle,
  forgejo,
  gitea,
  grimmory,
  immich,
  jellyfin,
  linkding,
  mealie,
  memos,
  portainer,
  readeck,
  romm,
  seerr,
  shelfmark,
  vaultwarden,
  wallabag,
} as const satisfies DataLoaders

export type AvailableDataLoaderId = keyof typeof dataLoaders
export type AvailableDataLoaders = typeof dataLoaders

export function getDataLoader<T extends AvailableDataLoaderId>(
  serviceId: T,
): AvailableDataLoaders[T] {
  return dataLoaders[serviceId]
}

export function hasDataLoader(
  serviceId: BuiltInServiceId,
): serviceId is AvailableDataLoaderId {
  return serviceId in dataLoaders
}
