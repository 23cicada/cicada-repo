import eslintConfigBase from "@repo/eslint-config/eslint-config-base"

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...eslintConfigBase,
  {
    rules: {
      "@typescript-eslint/no-unsafe-function-type": "off"
    }
  }
]
