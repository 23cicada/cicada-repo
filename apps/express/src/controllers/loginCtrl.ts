import asyncHandler from "express-async-handler"
import * as db from "#src/db/queries/index.ts"
import { body, validationResult, matchedData } from "express-validator"
import { ValidationError } from "#src/errors/ValidationError.ts"

const signUp = [
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
  body("password")
    .trim()
    .notEmpty()
    .withMessage(`Password is required.`)
    .bail()
    .isLength({ min: 8, max: 20 })
    .withMessage(`Password must be between 8 and 20 characters.`),
  asyncHandler(async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      throw new ValidationError(errors.array().map((error) => error.msg))
    }
    const { username, password } = matchedData(req)
    await db.insertUser(username, password)
    res.success()
  }),
]

export { signUp }
