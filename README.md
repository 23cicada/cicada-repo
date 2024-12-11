## Yarn

[Installation](https://yarnpkg.com/getting-started/install)

[Plug'n'Play](https://yarnpkg.com/features/pnp)

[Zero-installs](https://yarnpkg.com/features/caching#zero-installs)

[Corepack](https://yarnpkg.com/corepack)


## Install `husky` `lint-staged` in the root of the repo.
`Husky`
```shell
yarn add --dev husky
```
```shell
npx husky init
```
`lint-staged`
```shell
yarn add --dev lint-staged
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

## Create a new workspace
`turbo gen workspace --name @repo/xxx --type package|app`