import { Router } from "express"
import { getAuthorById } from "../../controllers/authorController.ts"

const booksRouter = Router()
const indexRouter = Router()
const bookRouter = Router()
const authorRouter = Router()

const links = [
  { href: "/books", text: "Home" },
  { href: "/books/about", text: "About" },
]

const users = ["Rose", "Cake", "Biff"]

indexRouter.get("/", (req, res) => {
  res.render("books", {
    message: "EJS rocks!",
    links,
    users,
  })
})

indexRouter.get("/about", (req, res) => {
  res.render("books/about")
})

indexRouter
  .route("/contact")
  .get((req, res) => {
    res.send("Get contact")
  })
  .post((req, res) => {
    res.send("Post contact")
  })

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

authorRouter.get("/", (req, res) => {
  res.send("All authors")
})

authorRouter.get("/:authorId", getAuthorById)

booksRouter.use("/", indexRouter)
booksRouter.use("/books", bookRouter)
booksRouter.use("/authors", authorRouter)

export default booksRouter
