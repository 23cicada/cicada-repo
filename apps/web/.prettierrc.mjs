import prettierConfig from "@repo/prettier-config";

/**
 * @type {import("prettier").Config}
 */
const config = {
  ...prettierConfig,
  semi: true,
  jsxSingleQuote: false,
  tabWidth: 4,
};

export default config;
