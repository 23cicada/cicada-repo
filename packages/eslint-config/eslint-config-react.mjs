import eslintConfigBase from "./eslint-config-base.mjs";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...eslintConfigBase,
  pluginReact.configs.flat.recommended,
  {
    plugins: {
      'react-hooks': pluginReactHooks
    },
    rules: pluginReactHooks.configs.recommended.rules
  },
];