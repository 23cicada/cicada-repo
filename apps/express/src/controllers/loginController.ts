import asyncHandler from 'express-async-handler'
import * as db from '#src/db/queries/index.ts'
import { body, validationResult, matchedData } from 'express-validator'
import { ValidationError } from '#src/errors/ValidationError.ts'
import passport, { type AuthenticateCallback } from 'passport'
import type { Handler } from 'express'
import { AuthenticateError } from '#src/errors/AuthenticateError.ts'

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
      throw new ValidationError(errors.array().map((error) => error.msg))
    }
    const { username, password } = matchedData(req)
    await db.insertUser(username, password)
    res.success()
  }),
]

const login: Handler = (req, res, next) => {
  const callback: AuthenticateCallback = (error, user, info) => {
    if (error) {
      return next(new AuthenticateError(error.message))
    }
    if (!user) {
      const message = (info as { message: string }).message
      return next(new AuthenticateError(message))
    }

    req.login(user, (error) => {
      if (error) {
        return next(new AuthenticateError(error?.message ?? 'Unknown error'))
      }
      res.success()
    })
  }
  passport.authenticate('local', callback)(req, res, next)
}

const logout: Handler = (req, res, next) => {
  // req.logOut()
  // res.success()
}

export { signUp, login, logout }
