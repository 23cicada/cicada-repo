import AppError from './AppError.ts'
import { ErrorCode } from '@repo/types'

export class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized', details?: unknown) {
    super(message, ErrorCode.UNAUTHORIZED, details)
    this.name = 'UnauthorizedError'
  }
}
