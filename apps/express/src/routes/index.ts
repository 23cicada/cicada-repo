import { Router } from 'express'
import usernameRouter from './username.ts'
import loginRouter from './login.ts'
import msgBoardRouter from './msgBoard.ts'

const router = Router()

router.use('/username', usernameRouter)
router.use('/login', loginRouter)
router.use('/msg-board', msgBoardRouter)

export default router
