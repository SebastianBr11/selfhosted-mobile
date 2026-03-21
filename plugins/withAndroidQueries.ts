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
          { $: { 'android:name': 'app.alextran.immich' } },
          { $: { 'android:name': 'com.nextcloud.client' } },
        ],
      },
    ]

    return config
  })
}

module.exports = withAndroidQueries
