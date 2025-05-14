import AppError from "./AppError.ts"
import { ErrorCode } from "./errorCode.ts"

export class ValidationError extends AppError {
  constructor(message = "Request parameters are malformed or invalid.") {
    super(ErrorCode.INVALID_PARAMETERS, message)
    this.name = "ValidationError"
  }
}
