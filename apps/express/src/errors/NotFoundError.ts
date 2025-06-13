import AppError from './AppError.ts'
import { ErrorCode } from '@repo/types'

export class NotFoundError extends AppError {
  constructor(
    message = 'The requested resource does not exist',
    details?: unknown,
  ) {
    super(message, ErrorCode.NOT_FOUND, details)
    this.name = 'NotFoundError'
  }
}
