import { Router } from "express"
import fs from "node:fs/promises"
import type { ViteDevServer } from "vite"
import { type EntryServerRender } from "../../app/interface.ts"
import { Transform } from "node:stream"
import path from "node:path"

const isProduction = process.env.NODE_ENV === "production"
const base = process.env.BASE ?? "/"
const appPath = path.join(import.meta.dirname, "../../app")
const ABORT_DELAY = 10000

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
      /* eslint-disable */
      render = (
        await vite.ssrLoadModule(path.join(appPath, "entry-server.tsx"))
      ).default
    } else {
      template = templateHtml
      render = (await import(path.join(appPath, "dist/server/entry-server.js")))
        .default
      // render = (await import("../../app/dist/server/entry-server.js")).default
      /* eslint-enable */
    }

    let didError = false

    const { pipe, abort } = render(url, {
      onShellError() {
        res.status(500)
        res.set({ "Content-Type": "text/html" })
        res.send("<h1>Something went wrong</h1>")
      },
      onShellReady() {
        res.status(didError ? 500 : 200)
        res.set({ "Content-Type": "text/html" })
        const transformStream = new Transform({
          transform(chunk, encoding, callback) {
            res.write(chunk, encoding)
            callback()
          },
        })
        const [htmlStart, htmlEnd] = template.split(`<!--app-html-->`)
        res.write(htmlStart)
        transformStream.on("finish", () => {
          res.end(htmlEnd)
        })
        pipe(transformStream)
      },
      onError(error) {
        didError = true
        console.error(error)
      },
    })

    setTimeout(() => {
      abort()
    }, ABORT_DELAY)
  } catch (e) {
    const error = e as Error
    vite?.ssrFixStacktrace(error)
    console.log(error.stack)
    res.status(500).end(error.stack)
  }
})

export default indexRouter
