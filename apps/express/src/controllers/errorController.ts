import type { ErrorRequestHandler } from "express"
import type { CustomError } from "../interface.ts"
import AppError from "../errors/AppError.ts"
import { ErrorCode } from "../errors/errorCode.ts"

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const stack = process.env.NODE_ENV === "production" ? null : err.stack

  if (err instanceof AppError) {
    return res.error(err.code, err.message, err.statusCode, { stack })
  }

  return res.error(
    ErrorCode.INTERNAL_SERVER_ERROR,
    "An unexpected server error occurred.",
    500,
    { stack },
  )
}

export default errorHandler
