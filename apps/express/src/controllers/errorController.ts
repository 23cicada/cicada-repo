import type { ErrorRequestHandler } from "express"
import type { CustomError } from "../interface.ts"

const errorHandler: ErrorRequestHandler = (
  err: CustomError,
  req,
  res,
  next,
) => {
  switch (err.statusCode) {
    case 404:
      {
        res.status(err.statusCode).render("404", {
          message: err.message,
        })
      }
      break
    default:
      res.status(err.statusCode ?? 500).send(err.message)
  }
}

export default errorHandler
