import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginTurbo from 'eslint-config-turbo/flat'
import { includeIgnoreFile } from "@eslint/compat";
import path from "node:path";

// process.cwd() is used to get the current working directory of the node.js process.
const gitignorePath = path.resolve(process.cwd(), ".gitignore")

/** @type {import('eslint').Linter.Config[]} */
export default [
  includeIgnoreFile(gitignorePath),
  pluginJs.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  ...pluginTurbo,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
];