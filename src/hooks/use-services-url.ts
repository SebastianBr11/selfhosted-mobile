import { UrlSchema } from '@/lib/schemas'

import { createStore } from 'stan-js'
import { storage } from 'stan-js/storage'
import { safeParse } from 'valibot'

const { useStore } = createStore({
  url: storage<string>(process.env.EXPO_PUBLIC_SERVICES_URL),
})

type UseServicesUrl = {
  setUrl: ReturnType<typeof useStore>['setUrl']
  urlFromEnv: boolean
} & (
  | { url: undefined; valid: false; errors: string[] }
  | { url: string; valid: true; errors: undefined }
)
export function useServicesUrl(): UseServicesUrl {
  const { url, setUrl } = useStore()

  const result = safeParse(UrlSchema, url)
  const state = { setUrl, urlFromEnv: !!url }
  if (result.success) {
    return { ...state, url: result.output, valid: true, errors: undefined }
  }

  return {
    ...state,
    valid: false,
    errors: result.issues.map((error) => error.message),
    url: undefined,
  }
}
