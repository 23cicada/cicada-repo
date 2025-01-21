import { Router } from "express"

const bookRouter = Router()

bookRouter.get("/", (req, res) => {
  res.send("All books")
})

bookRouter.get("/:bookId", (req, res) => {
  const { bookId } = req.params
  res.send(`Book ID: ${bookId}`)
})

bookRouter
  .route("/:bookId/reserve") // Chainable route handlers
  .get((req, res) => {
    const { bookId } = req.params
    res.send(`Get reserve: ${bookId}`)
  })
  .post((req, res) => {
    const { bookId } = req.params
    res.send(`Post reserve: ${bookId}`)
  })

export default bookRouter
