const pluginQuery = require('@tanstack/eslint-plugin-query')
const expoConfig = require('eslint-config-expo/flat')
const pluginLingui = require('eslint-plugin-lingui')
const perfectionist = require('eslint-plugin-perfectionist')
// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config')

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*', 'src/locales/*'],
  },
  pluginLingui.configs['flat/recommended'],
  perfectionist.configs['recommended-natural'],
  ...pluginQuery.configs['flat/recommended'],
  {
    rules: {
      'perfectionist/sort-imports': [
        'error',
        {
          newlinesBetween: 0,
        },
      ],
    },
  },
])
