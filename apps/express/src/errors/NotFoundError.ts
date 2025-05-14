import AppError from "./AppError.ts"
import { ErrorCode } from "./errorCode.ts"

export class NotFoundError extends AppError {
  constructor(message = "The requested resource does not exist.") {
    super(ErrorCode.NOT_FOUND, message)
    this.name = "NotFoundError"
  }
}
