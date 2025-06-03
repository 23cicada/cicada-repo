const config = {
  "**/*": [
    (filenames) => `pnpm lint --fix --file ${filenames.join(" --file ")}`,
    "pnpm --workspace-root prettier:staged",
  ],
}

export default config
