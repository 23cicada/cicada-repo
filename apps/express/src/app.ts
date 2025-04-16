import express from "express"
import usersRouter from "./routes/usersRouter.ts"
import booksRouter from "./routes/booksRouter.ts"
import msgBoardRouter from "./routes/msgBoardRouter.ts"
// import indexRouter from "./routes/indexRouter.ts"
import path from "node:path"
import errorHandler from "./controllers/errorController.ts"
import next from "next"

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
app.use(express.static(assetsPath))

app.use("/users", usersRouter)
app.use("/books", booksRouter)
app.use("/msg-board", msgBoardRouter)
// app.use("/", indexRouter)
// app.use((req, res) => {
//   res.status(404).render("404")
// })

app.use(errorHandler)

nextApp.prepare().then(() => {
  app.get("*", (req, res) => {
    return handle(req, res)
  })
  app.listen(PORT, () => {
    console.log(
      `> Server listening at http://localhost:${PORT} as ${
        DEV ? "development" : process.env.NODE_ENV
      }`,
    )
  })
})
