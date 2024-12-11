import path from 'node:path'

// https://nextjs.org/docs/app/api-reference/config/eslint#running-lint-on-staged-files
const buildEslintCommand = (filenames) => `pnpm next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`

export default {
  '**/*': [buildEslintCommand, 'pnpm format staged'],
}
