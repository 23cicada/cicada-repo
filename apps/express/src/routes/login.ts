import { Router } from 'express'
import {
  signUp,
  login as loginCtrl,
  logout,
} from '../controllers/loginController.ts'

const login = Router()

login.post('/sign-up', signUp)
login.post('/', loginCtrl)
login.post('/logout', logout)

export default login
