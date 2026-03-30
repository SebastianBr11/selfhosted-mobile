import { createStore } from 'stan-js'
import { storage } from 'stan-js/storage'

export const { useStore: useSettings } = createStore({
  showAppStoreButton: storage<boolean>(true),
  showOpenInBrowserButton: storage<boolean>(true),
})
