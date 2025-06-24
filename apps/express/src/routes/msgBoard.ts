import { Router } from 'express'
import {
  getMessages,
  getMessageDetail,
  createMessage,
  deleteMessage,
} from '../controllers/msgBoardController.ts'

const indexRouter = Router()

indexRouter.get('/', getMessages)

indexRouter.get('/detail/:id', getMessageDetail)

indexRouter.post('/new', createMessage)

indexRouter.post('/delete/:id', deleteMessage)

export default indexRouter
