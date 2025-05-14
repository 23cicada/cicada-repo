import type { Request, Response, NextFunction } from "express"

export default function responseEnhancer(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  res.success = (data, message, statusCode = 200) => {
    res.status(statusCode).json({
      success: true,
      data,
      message,
    })
  }

  res.error = (code, message, statusCode = 500, details) => {
    res.status(statusCode).json({
      success: false,
      error: {
        code,
        message,
        details,
      },
    })
  }

  next()
}
