import asyncHandler from 'express-async-handler'
import * as db from '#db/queries/index.ts'
import { body, validationResult, matchedData } from 'express-validator'
import { ValidationError } from '#errors/ValidationError.ts'
import passport, { type AuthenticateCallback } from 'passport'
import type { Handler } from 'express'
import { AppError, ErrorCode } from '#errors/index.ts'
import bcrypt from 'bcryptjs'

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
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const details = errors.array().map((error) => error.msg)
      throw new ValidationError(details?.[0], errors.array())
    }
    const { username, password } = matchedData(req)
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await db.insertUser(username, hashedPassword)
    req.login({ id: user.id }, (error) => {
      if (error) {
        return next(new AppError(error?.message, ErrorCode.AUTHENTICATE_FAILED))
      }
      res.success()
    })
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
    req.login(user, (error) => {
      if (error) {
        return nextWithError(error)
      }
      res.success()
    })
  }) as AuthenticateCallback)(req, res, next)
}

const logout: Handler = (req, res, next) => {
  req.logOut((error) => {
    if (error) {
      return next(new AppError(error.message))
    }
    res.success()
  })
}

export { signUp, login, logout }
