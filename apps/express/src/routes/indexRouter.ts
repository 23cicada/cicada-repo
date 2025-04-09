import { Router } from "express"
import fs from "node:fs/promises"
import type { ViteDevServer } from "vite"
import { type EntryServerRender } from "../../app/interface.ts"
import path from "node:path"
import { pathToFileURL } from "node:url"

const isProduction = process.env.NODE_ENV === "production"
const base = process.env.BASE ?? "/"
const appPath = path.join(import.meta.dirname, "../../app")

const templateHtml = isProduction
  ? await fs.readFile(path.join(appPath, "dist/client/index.html"), "utf-8")
  : ""

const indexRouter = Router()

let vite: ViteDevServer | undefined
if (!isProduction) {
  const { createServer } = await import("vite")
  vite = await createServer({
    server: { middlewareMode: true },
    appType: "custom",
    base,
    root: appPath,
  })
  indexRouter.use(vite.middlewares)
} else {
  const compression = (await import("compression")).default
  const sirv = (await import("sirv")).default
  indexRouter.use(compression())
  indexRouter.use(
    base,
    sirv(path.join(appPath, "dist/client"), { extensions: [] }),
  )
}

indexRouter.get("/", async (req, res) => {
  try {
    const url = req.originalUrl.replace(base, "")
    let template, render: EntryServerRender
    if (!isProduction && vite) {
      template = await fs.readFile(path.join(appPath, "index.html"), "utf-8")
      template = await vite.transformIndexHtml(url, template)
      render = (
        await vite.ssrLoadModule(path.join(appPath, "entry-server.tsx"))
      ).default
    } else {
      template = templateHtml
      render = (
        await import(
          pathToFileURL(path.join(appPath, "dist/server/entry-server.js")).href
        )
      ).default
    }

    render({ req, res, template })
  } catch (e) {
    const error = e as Error
    vite?.ssrFixStacktrace(error)
    console.log(error.stack)
    res.status(500).end(error.stack)
  }
})

export default indexRouter
