
## Create a new workspace
`turbo gen workspace --name @repo/xxx --type package|app`

```shell
pnpm add -D eslint typescript
```
```shell
pnpm add -D --workspace @repo/eslint-config @repo/typescript-config
```

```json
  {
  "scripts": {
    "format-check": "format check",
    "format-write": "format write",
    "lint": "eslint . --max-warnings 0"
  }
}
```

.lintstagedrc.mjs
```js
export default {
  '**/*': [
    'pnpm eslint --fix --no-warn-ignored --max-warnings 0',
    'pnpm format staged',
  ],
}
```

.eslint.config.mjs
```js
import eslintConfigReact from '@repo/eslint-config/eslint-config-react'

/** @type {import('eslint').Linter.Config[]} */
const config = eslintConfigReact
export default config
```

.gitignore

tsconfig.json
```json
{
  "extends": "@repo/typescript-config/base.json",
  "include": ["src"],
  "exclude": ["node_modules"]
}
```

## Install `husky` `lint-staged` in the root of the repo.
`Husky`
```shell
pnpm add -D husky
```
```shell
npx husky init
```
`lint-staged`
```shell
pnpm add -D lint-staged
```
Create a `.lintstagedrc.mjs` in each package.

Create an "empty" `.lintstagedrc.mjs` to the root of the repo.

[How to use lint-staged in a multi-package monorepo?](https://github.com/lint-staged/lint-staged?tab=readme-ov-file#how-to-use-lint-staged-in-a-multi-package-monorepo)

### `--relative`
Pass filepaths relative to process.cwd() (where lint-staged runs) to tasks.

Current directory(`.lintstagedrc.mjs`): cicada-repo/apps/web

Before
```javascript
filenames [
  '/Users/xxx/code/cicada-repo/apps/web/app/layout.tsx',
  '/Users/xxx/code/cicada-repo/apps/web/app/page.tsx'
]
```
After
```javascript
filenames [
  'app/layout.tsx',
  'app/page.tsx'
]
```


### Yarn

[Installation](https://yarnpkg.com/getting-started/install)

[Plug'n'Play](https://yarnpkg.com/features/pnp)

[Zero-installs](https://yarnpkg.com/features/caching#zero-installs)

[Corepack](https://yarnpkg.com/corepack)
