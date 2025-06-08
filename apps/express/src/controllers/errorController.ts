import type { ErrorRequestHandler } from "express"
import AppError from "../errors/AppError.ts"
import { ErrorCode } from "@repo/types"

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err)
  const stack = process.env.NODE_ENV === "production" ? null : err.stack

  if (err instanceof AppError) {
    return res.error({
      code: err.code,
      details: err.details,
      statusCode: err.statusCode,
      stack,
    })
  }

  return res.error({
    code: ErrorCode.INTERNAL_SERVER_ERROR,
    details: null,
    statusCode: 500,
    stack,
  })
}

export default errorHandler
