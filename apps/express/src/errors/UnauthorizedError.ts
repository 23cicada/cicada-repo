import AppError from "./AppError.ts"
import { ErrorCode } from "@repo/types"

export class UnauthorizedError extends AppError {
  constructor(details?: unknown) {
    super("Unauthorized", ErrorCode.UNAUTHORIZED, details)
    this.name = "UnauthorizedError"
  }
}
