import { onlineManager } from '@tanstack/react-query'
import * as Network from 'expo-network'

export async function initNetwork() {
  onlineManager.setEventListener((setOnline) => {
    const listener = Network.addNetworkStateListener((event) => {
      setOnline(!!event.isInternetReachable)
    })
    return listener.remove
  })
  const networkState = await Network.getNetworkStateAsync()
  onlineManager.setOnline(!!networkState.isInternetReachable)
}
