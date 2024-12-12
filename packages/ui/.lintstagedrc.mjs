export default {
  '**/*': [
    'pnpm eslint --fix --no-warn-ignored --max-warnings 0',
    'pnpm format staged',
  ],
}
