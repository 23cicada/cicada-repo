import asyncHandler from 'express-async-handler'
import * as db from '#src/db/queries/index.ts'
import { body, validationResult, matchedData } from 'express-validator'
import { ValidationError } from '#src/errors/ValidationError.ts'
import passport, { type AuthenticateCallback } from 'passport'
import type { Handler } from 'express'
import { AppError, ErrorCode } from '#src/errors/index.ts'

const signUp = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage(`Username is required.`)
    .bail()
    .isLength({ min: 3, max: 20 })
    .withMessage(`Username must be between 3 and 20 characters.`)
    .bail()
    .matches(/^[A-Za-z0-9_]+$/)
    .withMessage(
      'Username can only contain letters, numbers, and underscores.',
    ),
  body('password')
    .trim()
    .notEmpty()
    .withMessage(`Password is required.`)
    .bail()
    .isLength({ min: 8, max: 20 })
    .withMessage(`Password must be between 8 and 20 characters.`),
  asyncHandler(async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const details = errors.array().map((error) => error.msg)
      throw new ValidationError(details?.[0], errors.array())
    }
    const { username, password } = matchedData(req)
    await db.insertUser(username, password)
    res.success()
  }),
]

const login: Handler = (req, res, next) => {
  const nextWithError = (error: unknown) =>
    next(
      new AppError(
        (error as { message: string })?.message,
        ErrorCode.AUTHENTICATE_FAILED,
      ),
    )

  passport.authenticate('local', ((error, user, info) => {
    if (error || !user) {
      return nextWithError(error || info)
    }
    console.log('user', user)
    req.login(user, (error) => {
      if (error) {
        return nextWithError(error)
      }
      res.success()
    })
  }) as AuthenticateCallback)(req, res, next)
}

const logout: Handler = (req, res) => {
  req.logOut((error) => {
    if (error) {
      new AppError(error.message)
    }
    res.success()
  })
}

export { signUp, login, logout }
