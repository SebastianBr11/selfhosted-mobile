import 'tsx/cjs'
import { ConfigContext, ExpoConfig } from 'expo/config'
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
  android: {
    adaptiveIcon: {
      backgroundColor: '#E6F4FE',
      foregroundImage: adaptiveIcon,
      monochromeImage: monochromeIcon,
    },
    package: appId,
    predictiveBackGestureEnabled: true,
  },
  description: 'An android app to see your selfhosted services.',
  experiments: {
    reactCompiler: true,
    typedRoutes: true,
  },
  extra: {
    eas: {
      projectId: 'efcf4ebd-d45b-4359-a939-3449d6767b50',
    },
    router: {},
  },
  icon: './assets/images/icon.png',
  ios: {
    icon: {
      dark: './assets/icons/ios-dark.png',
      light: './assets/icons/ios-light.png',
      tinted: './assets/icons/ios-tinted.png',
    },
  },
  name,
  orientation: 'portrait',
  platforms: ['android'],
  plugins: [
    './plugins/withAndroidQueries.ts',
    'expo-router',
    [
      'expo-splash-screen',
      {
        backgroundColor: '#ffffff',
        dark: {
          backgroundColor: '#121312',
          image: './assets/icons/splash-icon-dark.png',
        },
        image: './assets/icons/splash-icon-light.png',
        imageWidth: 200,
        resizeMode: 'contain',
      },
    ],
    'expo-web-browser',
    [
      'expo-localization',
      {
        supportedLocales: ['de', 'en', 'es'],
      },
    ],
    'expo-sharing',
    'expo-image',
    'expo-font',
  ],
  scheme: 'selfhostedmobile',
  slug: 'selfhosted-mobile',
  userInterfaceStyle: 'automatic',
  version: appVersion,
  web: {
    favicon: './assets/images/favicon.png',
    output: 'static',
  },
})
