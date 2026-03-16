import 'tsx/cjs'
import { ExpoConfig, ConfigContext } from 'expo/config'
import { version as appVersion } from './package.json'

const IS_DEV = process.env.APP_VARIANT === 'development'
const name = IS_DEV ? 'Selfhosted Library (Dev)' : 'Selfhosted Library'
const appId = IS_DEV ? 'com.selfhostedmobile.dev' : 'com.selfhostedmobile.app'

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name,
  slug: 'selfhosted-mobile',
  version: appVersion,
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  scheme: 'selfhostedmobile',
  userInterfaceStyle: 'automatic',
  platforms: ['android'],
  description: 'An android app to see your selfhosted services.',
  ios: {
    icon: './assets/expo.icon',
  },
  android: {
    adaptiveIcon: {
      backgroundColor: '#E6F4FE',
      foregroundImage: './assets/images/android-icon-foreground.png',
      backgroundImage: './assets/images/android-icon-background.png',
      monochromeImage: './assets/images/android-icon-monochrome.png',
    },
    predictiveBackGestureEnabled: true,
    package: appId,
  },
  web: {
    output: 'static',
    favicon: './assets/images/favicon.png',
  },
  plugins: [
    './plugins/withAndroidQueries.ts',
    'expo-router',
    [
      'expo-splash-screen',
      {
        backgroundColor: '#208AEF',
        android: {
          image: './assets/images/splash-icon.png',
          imageWidth: 76,
        },
      },
    ],
    'expo-web-browser',
  ],
  experiments: {
    typedRoutes: true,
    reactCompiler: true,
  },
  extra: {
    router: {},
    eas: {
      projectId: 'efcf4ebd-d45b-4359-a939-3449d6767b50',
    },
  },
})
