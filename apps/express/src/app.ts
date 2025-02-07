import express from "express"
import authorRouter from "./routes/authorRouter.ts"
import bookRouter from "./routes/bookRouter.ts"
import indexRouter from "./routes/indexRouter.ts"
import usersRouter from "./routes/usersRouter.ts"
import path from "node:path"
import errorHandler from "./controllers/errorController.ts"

const assetsPath = path.join(import.meta.dirname, "public")
const app = express()

app.set("views", path.join(import.meta.dirname, "views"))
app.set("view engine", "ejs")

app.use(express.urlencoded({ extended: true }))
app.use(express.static(assetsPath))

app.use("/users", usersRouter)
app.use("/authors", authorRouter)
app.use("/books", bookRouter)
app.use("/", indexRouter)
app.use((req, res) => {
  res.status(404).render("404")
})

app.use(errorHandler)

const PORT = process.env.PORT ?? 3001

app.listen(PORT, () => {
  console.log(`My first Express app - listening on port ${PORT}!`)
})
