import eslintConfigReact from '@repo/eslint-config/eslint-config-react'

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...eslintConfigReact,
  {
    ignores: ['turbo/'],
  },
]
