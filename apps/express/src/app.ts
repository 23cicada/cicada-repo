import express from "express"
import usersRouter from "./routes/usersRouter.ts"
import booksRouter from "./routes/booksRouter.ts"
import msgBoardRouter from "./routes/msgBoardRouter.ts"
import indexRouter from "./routes/indexRouter.ts"
import path from "node:path"
import errorHandler from "./controllers/errorController.ts"

const assetsPath = path.join(import.meta.dirname, "public")
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
app.use("/", indexRouter)
app.use((req, res) => {
  res.status(404).render("404")
})

app.use(errorHandler)

const PORT = process.env.PORT ?? 3001

app.listen(PORT, () => {
  console.log(`My first Express app - listening on port ${PORT}!!!!`)
})
