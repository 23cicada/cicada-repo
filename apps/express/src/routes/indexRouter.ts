import { Router } from "express"

const indexRouter = Router()

indexRouter.get("/", (req, res) => {
  res.render("index", {
    message: "EJS rocks!",
    links: [
      { href: "/", text: "Home" },
      { href: "about", text: "About" },
    ],
  })
})

indexRouter.get("/about", (req, res) => {
  res.send("About")
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
