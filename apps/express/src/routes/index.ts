import { Router } from "express"
import usernameRouter from "./username.ts"

const router = Router()

router.use("/username", usernameRouter)

export default router
