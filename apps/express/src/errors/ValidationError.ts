import AppError from './AppError.ts'
import { ErrorCode } from '@repo/types'

export class ValidationError extends AppError {
  constructor(
    message = 'Request parameters are malformed or invalid',
    details?: unknown,
  ) {
    super(message, ErrorCode.INVALID_PARAMETERS, details)
    this.name = 'ValidationError'
  }
}
