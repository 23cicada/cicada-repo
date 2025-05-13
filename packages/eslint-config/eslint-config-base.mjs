import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginTurbo from 'eslint-config-turbo/flat'
import eslintConfigPrettier from "eslint-config-prettier";
import { includeIgnoreFile } from "@eslint/compat";
import path from "node:path";
import fs from "node:fs";
import globals from 'globals'

// process.cwd() is used to get the current working directory of the node.js process.
const gitignorePath = path.resolve(process.cwd(), ".gitignore")
const gitignoreExists = fs.existsSync(gitignorePath)

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...(gitignoreExists ? [includeIgnoreFile(gitignorePath)] : []),
  pluginJs.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  ...tseslint.configs.stylistic,
  ...pluginTurbo,
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
];
