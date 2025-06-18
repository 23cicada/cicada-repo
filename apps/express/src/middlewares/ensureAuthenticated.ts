import type { Request, Response, NextFunction } from 'express'
import { UnauthorizedError } from '../errors/index.ts'

const ensureAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.path.includes('/api/login') || req.isAuthenticated?.()) {
    return next()
  }
  throw new UnauthorizedError()
}

export default ensureAuthenticated
