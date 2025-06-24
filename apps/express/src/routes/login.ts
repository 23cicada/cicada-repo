import { Router } from 'express'
import {
  signUp,
  login as loginCtrl,
  logout,
} from '../controllers/loginController.ts'

const login = Router()

login.post('/sign-up', signUp)
login.post('/logout', logout)
login.post('/', loginCtrl)

export default login
