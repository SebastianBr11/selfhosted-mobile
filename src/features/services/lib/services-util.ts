import { BuiltInServiceId, builtInServiceIds } from './services.system'

export function isBuiltInServiceId(id: string): id is BuiltInServiceId {
  return builtInServiceIds.includes(id as BuiltInServiceId)
}
