import path from 'node:path'

const buildEslintCommand = (filenames) => {
  console.log('filenames', filenames)
  return `next lint ./next --fix --file ${filenames
      .map((f) => path.relative(process.cwd(), f))
      .join(' --file ')}`
}

export default {
  "next/**/*": [
    buildEslintCommand,
    "pnpm --workspace-root prettier:staged",
  ],
  "src/**/*": [
    "pnpm eslint --fix --no-warn-ignored --max-warnings 0",
    "pnpm --workspace-root prettier:staged",
  ],
}
