import "dotenv/config"
import express from "express"
import next from "next"
import path from "node:path"
import viewsRouter from "./routes/views/indexRouter.ts"
import errorHandler from "./controllers/errorController.ts"
import apiRouter from "./routes/index.ts"
import responseEnhancer from "./middlewares/responseEnhancer.ts"

const PORT = parseInt(process.env.PORT || "3001", 10)
const DEV = process.env.NODE_ENV !== "production"
const assetsPath = path.join(import.meta.dirname, "public")
const nextApp = (next as unknown as typeof next.default)({
  dev: DEV,
  dir: path.join(import.meta.dirname, "../next"),
})
const handle = nextApp.getRequestHandler()

const app = express()

app.set("views", path.join(import.meta.dirname, "views"))
app.set("view engine", "ejs")

// https://expressjs.com/en/5x/api.html#express.urlencoded
// 用于解析 application/x-www-form-urlencoded 格式的数据，并将其放入 req.body。
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(assetsPath))
app.use(responseEnhancer)

nextApp.prepare().then(() => {
  app.get("/", (_, res) => res.render("index", { title: "Home" }))
  app.all("/cicada*", (req, res) => handle(req, res))
  app.use("/views", viewsRouter)
  app.use("/api", apiRouter)
  app.use((_, res) => res.status(404).render("404"))
  app.use(errorHandler)
  app.listen(PORT, () => {
    console.log(
      `> Server listening at http://localhost:${PORT} as ${
        DEV ? "development" : process.env.NODE_ENV
      }`,
    )
  })
})
