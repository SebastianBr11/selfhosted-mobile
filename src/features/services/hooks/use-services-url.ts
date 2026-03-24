import { useDeferredValue, useEffect } from 'react'
import { createStore } from 'stan-js'
import { storage } from 'stan-js/storage'
import { safeParse } from 'valibot'
import { UrlSchema } from '@/lib/schemas'

const { useStore } = createStore({
  url: storage<string>(process.env.EXPO_PUBLIC_SERVICES_URL || ''),
})

type UseServicesUrl = {
  deferredUrl: string
  setUrl: ReturnType<typeof useStore>['setUrl']
  url: string
  urlFromEnv: boolean
} & (
  | { errors: string[]; valid: false }
  | { errors: undefined; valid: true }
)
export function useServicesUrl(): UseServicesUrl {
  const { setUrl, url } = useStore()
  const deferredUrl = useDeferredValue(url)
  const result = safeParse(UrlSchema, url)
  const state = {
    deferredUrl,
    setUrl,
    url,
    urlFromEnv: !!process.env.EXPO_PUBLIC_SERVICES_URL,
  }

  useEffect(() => {
    if (process.env.EXPO_PUBLIC_SERVICES_URL) {
      setUrl(process.env.EXPO_PUBLIC_SERVICES_URL)
    }
  }, [state.urlFromEnv, setUrl])

  if (result.success) {
    return { ...state, errors: undefined, valid: true }
  }

  return {
    ...state,
    errors: result.issues.map((error) => error.message),
    valid: false,
  }
}
