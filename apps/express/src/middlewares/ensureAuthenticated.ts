import type { Request, Response, NextFunction } from "express"
import { UnauthorizedError } from "../errors/index.ts"

const ensureAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req?.isAuthenticated()) {
    throw new UnauthorizedError()
  }
  next()
}

export default ensureAuthenticated
