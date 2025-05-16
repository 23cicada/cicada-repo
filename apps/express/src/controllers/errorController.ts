import type { ErrorRequestHandler } from "express"
import AppError from "../errors/AppError.ts"
import { ErrorCode } from "../errors/errorCode.ts"

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err)
  const stack = process.env.NODE_ENV === "production" ? null : err.stack

  if (err instanceof AppError) {
    return res.error(err.code, err.errors, err.statusCode)
  }

  return res.error(ErrorCode.INTERNAL_SERVER_ERROR, { stack }, 500)
}

export default errorHandler
