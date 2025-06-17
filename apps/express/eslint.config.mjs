import eslintConfigBase from '@repo/eslint-config/eslint-config-base'
import globals from '@repo/eslint-config/globals'

/** @type {import('eslint').Linter.Config[]} */
export default [
  // {
  //   languageOptions: {
  //     globals: {
  //         ...globals.node,
  //     }
  //   },
  // },
  ...eslintConfigBase,
]
