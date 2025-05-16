import { ErrorCode, ErrorCodeToHttpStatus } from "./errorCode.ts"

class AppError extends Error {
  public statusCode
  public code
  public errors

  constructor(
    message: string,
    code: ErrorCode,
    errors: unknown = null,
    statusCode = ErrorCodeToHttpStatus[code],
  ) {
    super(message)
    this.code = code
    this.errors = errors
    this.statusCode = statusCode
    Error.captureStackTrace(this, this.constructor)
  }
}

export default AppError
