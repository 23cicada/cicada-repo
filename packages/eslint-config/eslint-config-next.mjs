import path from 'path';
import { fileURLToPath } from 'url';
import eslintConfigBase from "./eslint-config-base.mjs";
import { FlatCompat } from '@eslint/eslintrc'
import { fixupConfigRules } from "@eslint/compat";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('baseDirectory', import.meta.dirname ?? __dirname)
const compat = new FlatCompat({
    baseDirectory: __dirname,
    // resolvePluginsRelativeTo: __dirname,
})

/** @type {import('eslint').Linter.Config[]} */
export default [
    ...eslintConfigBase,
    // https://nextjs.org/docs/app/api-reference/config/eslint#additional-configurations
    ...compat.extends('next'),
];