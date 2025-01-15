import express from "express"
import authorRouter from "./routes/authorRouter"
import bookRouter from "./routes/bookRouter"
import indexRouter from "./routes/indexRouter"

const app = express()

app.use("/authors", authorRouter)
app.use("/books", bookRouter)
app.use("/", indexRouter)

const PORT = process.env.PORT ?? 3001

app.listen(PORT, () => {
  console.log(`My first Express app - listening on port ${PORT}!`)
})
