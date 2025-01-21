import express from "express"
import type { ErrorRequestHandler } from "express"
import authorRouter from "./routes/authorRouter.ts"
import bookRouter from "./routes/bookRouter.ts"
import indexRouter from "./routes/indexRouter.ts"
import type { CustomError } from "./interface.js"

const app = express()

app.use("/authors", authorRouter)
app.use("/books", bookRouter)
app.use("/", indexRouter)

const errorHandler: ErrorRequestHandler = (
  err: CustomError,
  req,
  res,
  next,
) => {
  console.error(err)
  res.status(err.statusCode ?? 500).send(err.message)
}

app.use(errorHandler)

const PORT = process.env.PORT ?? 3001

app.listen(PORT, () => {
  console.log(`My first Express app - listening on port ${PORT}!`)
})
