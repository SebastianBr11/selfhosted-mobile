import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister'
import { QueryClient } from '@tanstack/react-query'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { createMMKV } from 'react-native-mmkv'

const storage = createMMKV()

const clientStorage = {
  getItem: (key: string) => {
    const value = storage.getString(key)
    return value === undefined ? null : value
  },
  removeItem: (key: string) => {
    storage.remove(key)
  },
  setItem: (key: string, value: string) => {
    storage.set(key, value)
  },
}

const clientPersister = createAsyncStoragePersister({
  storage: clientStorage,
})

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
})

export function PersistentQueryClientProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister: clientPersister }}
    >
      {children}
    </PersistQueryClientProvider>
  )
}
