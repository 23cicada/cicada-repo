import express from "express"
import indexRouter from "./routes/indexRouter.ts"
import path from "node:path"
import errorController from "./controllers/errorController.ts"

const app = express()

// https://expressjs.com/en/5x/api.html#express.urlencoded
// 用于解析 application/x-www-form-urlencoded 格式的数据，并将其放入 req.body。
app.use(express.urlencoded({ extended: true }))
app.use("/", indexRouter)
app.use(errorController)
app.set("views", path.join(import.meta.dirname, "views"))
app.set("view engine", "ejs")

const PORT = process.env.PORT ?? 3001
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
