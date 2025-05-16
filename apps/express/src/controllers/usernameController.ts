import type { Request, Response } from "express"
import asyncHandler from "express-async-handler"
import { body, validationResult } from "express-validator"
import { ValidationError } from "../errors/ValidationError.ts"
import * as db from "../db/queries.ts"

const getUsernames = asyncHandler(async (_, res: Response) => {
  const usernames = await db.getAllusernames()
  res.success(usernames)
})

const createUsername = [
  body("username")
    .trim()
    .isAlpha()
    .withMessage(`Username must only contain letters.`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`Username must be between 1 and 10 characters.`),
  asyncHandler(async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      throw new ValidationError(errors.array())
    }
    const { username } = req.body
    await db.insertUsername(username)
    res.success()
  }),
]

export { getUsernames, createUsername }
