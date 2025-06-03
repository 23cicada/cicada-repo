import ErrorCode from "@repo/error-code"

const ErrorCodeToHttpStatus = {
  [ErrorCode.INVALID_PARAMETERS]: 400,
  [ErrorCode.INTERNAL_SERVER_ERROR]: 500,
  [ErrorCode.NOT_FOUND]: 404,
  [ErrorCode.UNAUTHORIZED]: 401,
}

export { ErrorCode, ErrorCodeToHttpStatus }
