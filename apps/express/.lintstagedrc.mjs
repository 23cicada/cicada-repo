export default {
  "**/*": ["pnpm lint --fix", "pnpm --workspace-root prettier:staged"],
}
