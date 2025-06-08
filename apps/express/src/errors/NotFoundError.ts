import AppError from "./AppError.ts"
import { ErrorCode } from "@repo/types"

export class NotFoundError extends AppError {
  constructor(details?: unknown) {
    super("The requested resource does not exist", ErrorCode.NOT_FOUND, details)
    this.name = "NotFoundError"
  }
}
