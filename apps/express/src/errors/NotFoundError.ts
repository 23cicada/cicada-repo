import AppError from "./AppError.ts"
import { ErrorCode } from "./errorCode.ts"

export class NotFoundError extends AppError {
  constructor(errors?: unknown) {
    super("The requested resource does not exist", ErrorCode.NOT_FOUND, errors)
    this.name = "NotFoundError"
  }
}
