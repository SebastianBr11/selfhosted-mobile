import { createStore } from 'stan-js'
import { storage } from 'stan-js/storage'

export const { useStore: useSettings } = createStore(
  {
    get canSetOpenAppDirectly() {
      return !this.showAppStoreButton && !this.showOpenInBrowserButton
    },
    get openAppDirectly() {
      return this.canSetOpenAppDirectly && this.openAppDirectlyInternal
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
