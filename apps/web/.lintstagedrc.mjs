const config = {
  '**/*': [
    'pnpm eslint --fix --no-warn-ignored --max-warnings 0',
    'pnpm --workspace-root prettier:staged',
  ],
}

export default config
