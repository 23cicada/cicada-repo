import { Router } from "express"
import fs from "node:fs/promises"

const isProduction = process.env.NODE_ENV === "production"
const base = process.env.BASE ?? "/"
const ABORT_DELAY = 10000

const templateHtml = isProduction
  ? await fs.readFile("./dist/client/index.html", "utf-8")
  : ""

const indexRouter = Router()

indexRouter.get("/", (req, res) => {
  res.render("index")
})

export default indexRouter
