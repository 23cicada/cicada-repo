import { Router } from 'express'
import { signUp, login as loginCtrl } from '#src/controllers/loginController.ts'

const login = Router()

login.post('/sign-up', signUp)
login.post('/', loginCtrl)

export default login
