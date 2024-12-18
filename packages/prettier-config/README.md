# Discarded !!!

## prettier-config

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
import prettierConfig from "@repo/prettier-config"

/**
 * @type {import("prettier").Config}
 */
const config = {
  ...usernamePrettierConfig,
  semi: false,
}

export default config
```

Create command line tool

[Building a simple command line tool with npm](https://blog.npmjs.org/post/118810260230/building-a-simple-command-line-tool-with-npm)
