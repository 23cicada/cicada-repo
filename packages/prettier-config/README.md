# prettier-config
```shell
yarn add --dev --exact prettier
```

package.json
```json
{
  "devDependencies": {
    "@repo/prettier-config": "*"
  }
}
```
.prettierrc.mjs
```js
import prettierConfig from "@repo/prettier-config";

/**
 * @type {import("prettier").Config}
 */
const config = {
  ...usernamePrettierConfig,
  semi: false,
};

export default config;
```

### QA

[node_modules/.cache/prettier](https://github.com/prettier/prettier/issues/13032#issuecomment-1866758574)