import { BuiltInServiceId } from '../services.system'
import { audiobookshelf } from './audiobookshelf'
import { dozzle } from './dozzle'
import { forgejo } from './forgejo'
import { gitea } from './gitea'
import { grimmory } from './grimmory'
import { immich } from './immich'
import { jellyfin } from './jellyfin'
import { mealie } from './mealie'
import { memos } from './memos'
import { portainer } from './portainer'
import { readeck } from './readeck'
import { romm } from './romm'
import { seerr } from './seerr'
import { shelfmark } from './shelfmark'
import { DataLoader } from './types'
import { vaultwarden } from './vaultwarden'
import { wallabag } from './wallabag'

const dataLoaders: DataLoader<BuiltInServiceId, object> = {
  ...audiobookshelf,
  ...dozzle,
  ...jellyfin,
  ...readeck,
  ...romm,
  ...shelfmark,
  ...forgejo,
  ...vaultwarden,
  ...gitea,
  ...grimmory,
  ...immich,
  ...mealie,
  ...memos,
  ...portainer,
  ...seerr,
  ...wallabag,
}

export function getDataLoader(serviceId: BuiltInServiceId) {
  return dataLoaders[serviceId]
}
