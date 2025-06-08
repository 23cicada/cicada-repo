import { ErrorCode } from "@repo/types"

const ErrorCodeToHttpStatus = {
  [ErrorCode.INVALID_PARAMETERS]: 400,
  [ErrorCode.INTERNAL_SERVER_ERROR]: 500,
  [ErrorCode.NOT_FOUND]: 404,
  [ErrorCode.UNAUTHORIZED]: 401,
}

class AppError extends Error {
  public statusCode
  public code
  public details

  constructor(
    message: string,
    code: ErrorCode,
    details: unknown = null,
    statusCode = ErrorCodeToHttpStatus[code],
  ) {
    super(message)
    this.code = code
    this.details = details
    this.statusCode = statusCode
    Error.captureStackTrace(this, this.constructor)
  }
}

export default AppError
