export default {
  '**/*': [
    'yarn eslint --max-warnings 0',
    'yarn format-staged'
  ],
}
