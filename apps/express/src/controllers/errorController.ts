import type { ErrorRequestHandler } from "express"
import type { CustomError } from "../interface.js"

const errorHandler: ErrorRequestHandler = (
  err: CustomError,
  req,
  res,
  next,
) => {
  console.error(err)
  res.status(err.statusCode ?? 500).send(err.message)
}

export default errorHandler
