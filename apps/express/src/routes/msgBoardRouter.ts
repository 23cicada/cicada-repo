import { Router } from "express"

const indexRouter = Router()

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
]

indexRouter.get("/", (req, res) => {
  res.render("msg-board", { messages })
})

indexRouter.get("/detail/:index", (req, res) => {
  const { index } = req.params
  res.render("msg-board/detail", { message: messages[Number(index)] })
})

indexRouter
  .route("/new")
  .get((req, res) => {
    res.render("msg-board/form")
  })
  .post((req, res) => {
    const { name, message } = req.body as { name?: string; message?: string }
    if (!name || !message) {
      throw new Error("Something wrong!")
    }
    messages.push({
      user: name,
      text: message,
      added: new Date(),
    })
    res.redirect("/msg-board")
  })

export default indexRouter
