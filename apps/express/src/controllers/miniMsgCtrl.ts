import { body, validationResult, matchedData, param } from 'express-validator'
import asyncHandler from 'express-async-handler'
import * as db from '../db/queries.ts'
import { ValidationError } from '../errors/ValidationError.ts'

const getMessages = asyncHandler(async (req, res) => {
  const messages = await db.getMessages()
  res.render('msg-board', { messages })
})

const getMessageDetail = [
  param('id').notEmpty().withMessage('ID is required'),
  asyncHandler(async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const details = errors.array().map((error) => error.msg)
      throw new ValidationError(details?.[0], details)
    }
    const message = await db.getMessage(req.params.id!)
    res.render('msg-board/detail', { message })
  }),
]

const createMessage = [
  body('text')
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Text must be between 1 and 200 characters'),
  body('username')
    .trim()
    .isLength({ min: 3, max: 20 })
    .withMessage('User must be between 3 and 20 characters'),
  asyncHandler(async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.render('msg-board/form', {
        errors: errors.array().map((error) => error.msg),
      })
      return
    }
    const { text, username } = matchedData(req)
    await db.insertMessage({ text, username })
    res.redirect('/views/msg-board')
  }),
]

const deleteMessage = [
  param('id').notEmpty().withMessage('ID is required'),
  asyncHandler(async (req, res) => {
    await db.deleteMessage(req.params.id!)
    res.redirect('/views/msg-board')
  }),
]
export { getMessages, getMessageDetail, createMessage, deleteMessage }
