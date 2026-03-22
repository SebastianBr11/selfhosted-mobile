import { withAndroidManifest, ConfigPlugin } from 'expo/config-plugins'

/**
 * Add queries that allow the app to open other apps.
 * @see https://developer.android.com/training/package-visibility
 */
const withAndroidQueries: ConfigPlugin = (config) => {
  return withAndroidManifest(config, (config) => {
    config.modResults.manifest.queries = [
      {
        package: [
          { $: { 'android:name': 'com.audiobookshelf.app' } },
          { $: { 'android:name': 'com.x8bit.bitwarden' } },
          { $: { 'android:name': 'com.synology.dsdrive' } },
          { $: { 'android:name': 'io.homeassistant.companion.android' } },
          { $: { 'android:name': 'app.alextran.immich' } },
          { $: { 'android:name': 'org.jellyfin.mobile' } },
          { $: { 'android:name': 'app.linkwarden' } },
          { $: { 'android:name': 'com.nextcloud.client' } },
          { $: { 'android:name': 'io.heckel.ntfy' } },
          { $: { 'android:name': 'io.github.mattsays.rommmobile' } },
          { $: { 'android:name': 'dev.seerr.mobileapp' } },
          { $: { 'android:name': 'com.github.catfriend1.syncthingfork' } },
          { $: { 'android:name': 'fr.gaulupeau.apps.InThePoche' } },
        ],
      },
    ]

    return config
  })
}

module.exports = withAndroidQueries
