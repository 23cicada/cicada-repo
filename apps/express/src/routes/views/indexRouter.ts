import { Router } from "express"
import msgBoardRouter from "./msgBoardRouter.ts"
import booksRouter from "./booksRouter.ts"
import usersRouter from "./usersRouter.ts"

const viewsRouter = Router()

viewsRouter.use("/users", usersRouter)
viewsRouter.use("/books", booksRouter)
viewsRouter.use("/msg-board", msgBoardRouter)

export default viewsRouter
