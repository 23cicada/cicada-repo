import { Router } from "express"

const username = Router()

username.get("/", (req, res) => {
  console.log("usernames will be logged here - wip")
})

username.get("/new", () => {})

username.post("/new", (req) => {
  console.log("username to be saved: ", req.body.username)
})

export default username
