import AppError from "./AppError.ts"
import { ErrorCode } from "@repo/types"

export class ValidationError extends AppError {
  constructor(details?: unknown) {
    super(
      "Request parameters are malformed or invalid",
      ErrorCode.INVALID_PARAMETERS,
      details,
    )
    this.name = "ValidationError"
  }
}
