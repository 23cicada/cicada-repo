import { Router } from "express"

const indexRouter = Router()

const links = [
  { href: "/", text: "Home" },
  { href: "about", text: "About" },
]

const users = ["Rose", "Cake", "Biff"]

indexRouter.get("/", (req, res) => {
  res.render("index", {
    message: "EJS rocks!",
    links,
    users,
  })
})

indexRouter.get("/about", (req, res) => {
  res.render("about")
})

indexRouter
  .route("/contact")
  .get((req, res) => {
    res.send("Get contact")
  })
  .post((req, res) => {
    res.send("Post contact")
  })

export default indexRouter
