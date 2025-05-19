import type { Request, Response } from "express"
import asyncHandler from "express-async-handler"
import { body, validationResult, query, matchedData } from "express-validator"
import { ValidationError } from "../errors/ValidationError.ts"
import * as db from "../db/queries.ts"

const getUsernames = [
  query("search")
    .trim()
    .notEmpty()
    .matches(/^[A-Za-z0-9_]+$/),
  asyncHandler(async (req: Request, res: Response) => {
    const search = validationResult(req).isEmpty()
      ? matchedData(req).search
      : undefined
    const usernames = await db.getAllusernames(search)
    res.success(usernames)
  }),
]

const createUsername = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage(`Username is required.`)
    .bail()
    .isLength({ min: 3, max: 20 })
    .withMessage(`Username must be between 3 and 20 characters.`)
    .bail()
    .matches(/^[A-Za-z0-9_]+$/)
    .withMessage(
      "Username can only contain letters, numbers, and underscores.",
    ),
  asyncHandler(async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      throw new ValidationError(errors.array().map((error) => error.msg))
    }

    const { username } = req.body
    await db.insertUsername(username)
    res.success()
  }),
]

const deleteUsername = [
  body("id").toInt().isInt(),
  asyncHandler(async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      throw new ValidationError(["Invalid username ID."])
    }
    await db.deleteUsername(req.body.id)
    res.success()
  }),
]
export { getUsernames, createUsername, deleteUsername }
