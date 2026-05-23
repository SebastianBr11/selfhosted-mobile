import { createStore } from 'stan-js'
import { storage } from 'stan-js/storage'

export const { useStore: useSettings } = createStore(
  {
    get canSetOpenAppDirectly() {
      const { showAppStoreButton, showOpenInBrowserButton } = this
      return !showAppStoreButton && !showOpenInBrowserButton
    },
    get canSetUseCupToCheckForUpdates() {
      const { fetchServiceData } = this
      return fetchServiceData
    },
    fetchServiceData: storage<boolean>(true),
    get openAppDirectly() {
      const { canSetOpenAppDirectly, openAppDirectlyInternal } = this
      return canSetOpenAppDirectly && openAppDirectlyInternal
    },
    openAppDirectlyInternal: storage<boolean>(false),
    showAppStoreButton: storage<boolean>(true),
    showOpenInBrowserButton: storage<boolean>(true),
    get useCupToCheckForUpdates() {
      const { canSetUseCupToCheckForUpdates, useCupToCheckForUpdatesInternal } =
        this
      return canSetUseCupToCheckForUpdates && useCupToCheckForUpdatesInternal
    },
    useCupToCheckForUpdatesInternal: storage<boolean>(true),
    get useLocalSource() {
      return !this.useRemoteSource
    },
    /** Only set in layout file! */
    useRemoteSource: storage<boolean>(false),
  },
  ({ actions }) => ({
    setOpenAppDirectly(openAppDirectly: boolean) {
      actions.setOpenAppDirectlyInternal(openAppDirectly)
    },
    setUseCupToCheckForUpdates(useCupToCheckForUpdates: boolean) {
      actions.setUseCupToCheckForUpdatesInternal(useCupToCheckForUpdates)
    },
    /** Only use in layout file! */
    setUseLocalSource(useLocalSource: boolean) {
      actions.setUseRemoteSource(!useLocalSource)
    },
  }),
)
