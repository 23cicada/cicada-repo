import { Router } from "express"
import usernameRouter from "./username.ts"
import loginRouter from "./login.ts"

const router = Router()

router.use("/username", usernameRouter)
router.use("/login", loginRouter)

export default router
