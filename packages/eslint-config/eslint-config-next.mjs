import path from "path"
import { FlatCompat } from "@eslint/eslintrc"
import pluginJs from "@eslint/js"
import eslintConfigPrettier from "eslint-config-prettier"
import pluginTurbo from "eslint-config-turbo/flat"
import { includeIgnoreFile } from "@eslint/compat"
import fs from "node:fs"

const gitignorePath = path.resolve(process.cwd(), ".gitignore")
const gitignoreExists = fs.existsSync(gitignorePath)

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
})

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...(gitignoreExists ? [includeIgnoreFile(gitignorePath)] : []),
  pluginJs.configs.recommended,
  eslintConfigPrettier,
  ...pluginTurbo,
  // https://github.com/vercel/next.js/issues/64114#issuecomment-2440625243
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // https://typescript-eslint.io/rules/no-unused-vars/#how-to-use
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",

      "no-empty-function": "off",
      "@typescript-eslint/no-empty-function": "off",

      "@typescript-eslint/no-non-null-assertion": "off"
    }
  }
]

// Document: https://nextjs.org/docs/app/api-reference/config/eslint
