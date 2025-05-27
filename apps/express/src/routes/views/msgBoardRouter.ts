import { Router } from "express"
import {
  getMessages,
  getMessageDetail,
  createMessage,
  deleteMessage,
} from "#src/controllers/miniMsgCtrl.ts"

const indexRouter = Router()

indexRouter.get("/", getMessages)

indexRouter.get("/detail/:id", getMessageDetail)

indexRouter
  .route("/new")
  .get((req, res) => res.render("msg-board/form", { errors: [] }))
  .post(createMessage)

indexRouter.post("/delete/:id", deleteMessage)

export default indexRouter
