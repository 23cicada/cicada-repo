import express from "express"
import authorRouter from "./routes/authorRouter.ts"
import bookRouter from "./routes/bookRouter.ts"
import indexRouter from "./routes/indexRouter.ts"
import path from "node:path"
import errorHandler from "./controllers/errorController.ts"

const assetsPath = path.join(import.meta.dirname, "public")
const app = express()

app.use("/authors", authorRouter)
app.use("/books", bookRouter)
app.use("/", indexRouter)

app.use(errorHandler)

app.set("views", path.join(import.meta.dirname, "views"))
app.set("view engine", "ejs")
app.use(express.static(assetsPath))

const PORT = process.env.PORT ?? 3001

app.listen(PORT, () => {
  console.log(`My first Express app - listening on port ${PORT}!`)
})
