import { Router } from "express"
import * as usernameController from "../controllers/usernameController.ts"

const username = Router()

username.get("/", usernameController.getUsernames)

username.post("/new", usernameController.createUsername)

username.post("/delete", usernameController.deleteUsername)

export default username
