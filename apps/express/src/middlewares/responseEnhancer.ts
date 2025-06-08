import type { Request, Response, NextFunction } from "express"

export default function responseEnhancer(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  res.success = (data, { statusCode = 200 } = {}) => {
    res.status(statusCode).json({
      success: true,
      data,
    })
  }

  res.error = (error, { statusCode = 500 } = {}) => {
    res.status(statusCode).json({
      success: false,
      error,
    })
  }

  next()
}
