import AppError from "./AppError.ts"
import { ErrorCode } from "./errorCode.ts"

export class ValidationError extends AppError {
  constructor(errors?: unknown) {
    super(
      "Request parameters are malformed or invalid",
      ErrorCode.INVALID_PARAMETERS,
      errors,
    )
    this.name = "ValidationError"
  }
}
