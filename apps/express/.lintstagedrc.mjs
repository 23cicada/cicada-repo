
export default {
  "next/**/*": [
    filenames => `pnpm lint:next --fix --file ${filenames.join(' --file ')}`,
    "pnpm --workspace-root prettier:staged",
  ],
  "src/**/*": [
    "pnpm lint:node --fix",
    "pnpm --workspace-root prettier:staged",
  ],
}
