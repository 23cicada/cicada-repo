import eslintConfigBase from '@repo/eslint-config/eslint-config-base'
import globals from '@repo/eslint-config/globals'

/** @type {import('eslint').Linter.Config[]} */
export default [
    { ignores: ["/next"] },
    {
        languageOptions: {
            globals: {
                ...globals.node,
            },
        },
    },
    ...eslintConfigBase
]

