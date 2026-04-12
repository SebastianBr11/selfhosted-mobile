import 'tsx/cjs'
import { ExpoConfig, ConfigContext } from 'expo/config'
import { version as appVersion } from './package.json'

const IS_DEV = process.env.APP_VARIANT === 'development'
const IS_PREVIEW = process.env.APP_VARIANT === 'preview'
const name = IS_DEV
  ? 'Selfhosted Library (Dev)'
  : IS_PREVIEW
    ? 'Selfhosted Library (Preview)'
    : 'Selfhosted Library'
const appId = IS_DEV
  ? 'com.selfhostedmobile.dev'
  : IS_PREVIEW
    ? 'com.selfhostedmobile.preview'
    : 'com.selfhostedmobile.app'

const adaptiveIcon = `./assets/icons/${IS_DEV ? 'debug-' : IS_PREVIEW ? 'preview-' : ''}adaptive-icon.png`
const monochromeIcon = `./assets/icons/${IS_DEV ? 'debug-' : IS_PREVIEW ? 'preview-' : ''}monochrome-icon.png`

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
    icon: {
      dark: './assets/icons/ios-dark.png',
      light: './assets/icons/ios-light.png',
      tinted: './assets/icons/ios-tinted.png',
    },
  },
  android: {
    adaptiveIcon: {
      backgroundColor: '#E6F4FE',
      foregroundImage: adaptiveIcon,
      monochromeImage: monochromeIcon,
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
        backgroundColor: '#ffffff',
        image: './assets/icons/splash-icon-light.png',
        imageWidth: 200,
        resizeMode: 'contain',
        dark: {
          image: './assets/icons/splash-icon-dark.png',
          backgroundColor: '#121312',
        },
      },
    ],
    'expo-web-browser',
    [
      'expo-localization',
      {
        supportedLocales: ['de', 'en', 'es'],
      },
    ],
    "expo-sharing",
    "expo-image",
    "expo-font"
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
