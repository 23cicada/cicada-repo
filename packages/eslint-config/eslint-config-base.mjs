import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginTurbo from 'eslint-config-turbo/flat'
import eslintConfigPrettier from "eslint-config-prettier";
import { includeIgnoreFile } from "@eslint/compat";
import path from "node:path";

// process.cwd() is used to get the current working directory of the node.js process.
const gitignorePath = path.resolve(process.cwd(), ".gitignore")

/** @type {import('eslint').Linter.Config[]} */
export default [
  includeIgnoreFile(gitignorePath),
  pluginJs.configs.recommended,
  eslintConfigPrettier,
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
    rules: {
      "@typescript-eslint/restrict-template-expressions": [
        "error",
        {
          "allowNumber": true
        }
      ]
    }
  },
  // https://typescript-eslint.io/troubleshooting/typed-linting/#i-get-errors-telling-me--was-not-found-by-the-project-service-consider-either-including-it-in-the-tsconfigjson-or-including-it-in-allowdefaultproject
  {
    files: ['**/*.mjs'],
    ...tseslint.configs.disableTypeChecked
  },
  {
    // https://typescript-eslint.io/rules/no-unused-vars/#how-to-use
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/ban-ts-comment": ["error", {
        "ts-expect-error": false
      }]
    }
  }
];
