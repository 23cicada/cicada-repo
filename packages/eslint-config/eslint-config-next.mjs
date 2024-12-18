import path from "path"
import { fileURLToPath } from "url"
import { FlatCompat } from "@eslint/eslintrc"
import pluginJs from "@eslint/js"
import eslintConfigPrettier from "eslint-config-prettier"
import pluginTurbo from "eslint-config-turbo/flat"
import { includeIgnoreFile } from "@eslint/compat"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const gitignorePath = path.resolve(process.cwd(), ".gitignore")

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

/** @type {import('eslint').Linter.Config[]} */
export default [
  includeIgnoreFile(gitignorePath),
  pluginJs.configs.recommended,
  eslintConfigPrettier,
  ...pluginTurbo,
  // https://github.com/vercel/next.js/issues/64114#issuecomment-2440625243
  ...compat.extends("next/core-web-vitals", "next/typescript"),
]
