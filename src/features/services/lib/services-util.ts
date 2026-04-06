import { BuiltInService, Service, ServiceUrl } from './service.schema'
import { BuiltInServiceId, builtInServiceIds } from './services.system'

export function isBuiltInService(service: Service): service is BuiltInService {
  return isBuiltInServiceId(service.id)
}

export function isBuiltInServiceId(id: string): id is BuiltInServiceId {
  return builtInServiceIds.includes(id as BuiltInServiceId)
}

export function serviceUrl(url: string): ServiceUrl {
  return url as ServiceUrl
}
