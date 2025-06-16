import AppError from './AppError.ts'
import { ErrorCode } from '@repo/types'

export class AuthenticateError extends AppError {
  constructor(message = 'Authenticate failed', details?: unknown) {
    super(message, ErrorCode.AUTHENTICATE_FAILED, details)
    this.name = 'AuthenticateError'
  }
}
