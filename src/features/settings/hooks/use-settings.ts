import { createStore } from 'stan-js'
import { storage } from 'stan-js/storage'

export const { useStore: useSettings } = createStore(
  {
    get canSetOpenAppDirectly() {
      const { showAppStoreButton, showOpenInBrowserButton } = this
      return !showAppStoreButton && !showOpenInBrowserButton
    },
    get openAppDirectly() {
      const { canSetOpenAppDirectly, openAppDirectlyInternal } = this
      return canSetOpenAppDirectly && openAppDirectlyInternal
    },
    openAppDirectlyInternal: storage<boolean>(false),
    showAppStoreButton: storage<boolean>(true),
    showOpenInBrowserButton: storage<boolean>(true),
  },
  ({ actions }) => ({
    setOpenAppDirectly(openAppDirectly: boolean) {
      actions.setOpenAppDirectlyInternal(openAppDirectly)
    },
  }),
)
