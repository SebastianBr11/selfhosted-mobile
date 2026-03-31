import { queryOptions } from '@tanstack/react-query'
import { fetch } from 'expo/fetch'
import { serviceSystem } from './services.system'

export const remoteServicesQueryOptions = (url: string) => {
  return queryOptions({
    enabled: false,
    queryFn: async ({ signal }) => {
      const data = await fetch(url, { signal })
      return serviceSystem.parse(await data.json())
    },
    queryKey: ['services', url],
    retry: false,
  })
}
