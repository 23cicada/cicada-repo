import AppError from "./AppError.ts"
import { ErrorCode } from "./errorCode.ts"

export class UnauthorizedError extends AppError {
  constructor(errors?: unknown) {
    super("Unauthorized", ErrorCode.UNAUTHORIZED, errors)
    this.name = "UnauthorizedError"
  }
}
