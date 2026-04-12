import { BuiltInServiceId } from '../services.system'
import { audiobookshelf } from './audiobookshelf'
import { dozzle } from './dozzle'
import { gitea } from './gitea'
import { grimmory } from './grimmory'
import { immich } from './immich'
import { jellyfin } from './jellyfin'
import { readeck } from './readeck'
import { romm } from './romm'
import { shelfmark } from './shelfmark'
import { DataLoader } from './types'
import { vaultwarden } from './vaultwarden'

const dataLoaders: DataLoader<BuiltInServiceId, object> = {
  ...audiobookshelf,
  ...dozzle,
  ...jellyfin,
  ...readeck,
  ...romm,
  ...shelfmark,
  ...vaultwarden,
  ...gitea,
  ...grimmory,
  ...immich,
}

export function getDataLoader(serviceId: BuiltInServiceId) {
  return dataLoaders[serviceId]
}
