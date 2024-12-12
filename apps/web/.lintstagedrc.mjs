const config = {
  '**/*': [
    'pnpm eslint --fix --no-warn-ignored --max-warnings 0',
    'pnpm format staged',
  ],
}

export default config
