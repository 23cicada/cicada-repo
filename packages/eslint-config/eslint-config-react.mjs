import eslintConfigBase from "./eslint-config-base.mjs";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...eslintConfigBase,
  pluginReact.configs.flat.recommended,
  // https://github.com/jsx-eslint/eslint-plugin-react?tab=readme-ov-file#configuration-legacy-eslintrc-
  pluginReact.configs.flat['jsx-runtime'],
  {
    settings: {
      react: {
        // React version. "detect" automatically picks the version you have installed.
        version: "detect"
      }
    }
  },
  {
    plugins: {
      'react-hooks': pluginReactHooks
    },
    rules: pluginReactHooks.configs.recommended.rules
  },
];