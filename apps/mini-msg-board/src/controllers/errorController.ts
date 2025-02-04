import type { ErrorRequestHandler } from "express"

const errorController: ErrorRequestHandler = (err: Error, req, res, next) => {
  console.error(err)
  res.status(500).send(err.message)
}

export default errorController
