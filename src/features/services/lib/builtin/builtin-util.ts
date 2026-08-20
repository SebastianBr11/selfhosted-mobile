import { ServiceUrl } from '../service.schema'

export function serviceUrl(url: string): ServiceUrl {
  return url as ServiceUrl
}
