import { ErrorCode, ErrorCodeToHttpStatus } from "./errorCode.ts"

class AppError extends Error {
  public statusCode: number
  public code: ErrorCode

  constructor(
    code: ErrorCode,
    message: string,
    statusCode = ErrorCodeToHttpStatus[code],
  ) {
    super(message)
    this.statusCode = statusCode
    this.code = code
    Error.captureStackTrace(this, this.constructor)
  }
}

export default AppError
