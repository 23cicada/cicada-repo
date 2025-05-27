import { Router } from "express"
import { signUp } from "#src/controllers/loginCtrl.ts"

const login = Router()

login.post("/sign-up", signUp)

export default login
