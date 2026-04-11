import { BuiltInServiceId } from '../services.system'
import { audiobookshelf } from './audiobookshelf'
import { dozzle } from './dozzle'
import { jellyfin } from './jellyfin'
import { readeck } from './readeck'
import { romm } from './romm'
import { DataLoader } from './types'

const dataLoaders: DataLoader<BuiltInServiceId, object> = {
  ...audiobookshelf,
  ...dozzle,
  ...jellyfin,
  ...readeck,
  ...romm,
}

export function getDataLoader(serviceId: BuiltInServiceId) {
  return dataLoaders[serviceId]
}
