import type { Request, Response } from "express"
import asyncHandler from "express-async-handler"
import * as db from "../db/queries.ts"

const getUsernames = asyncHandler(async (_, res: Response) => {
  const usernames = await db.getAllusernames()
  res.json(usernames)
})

const createUsername = asyncHandler(async (req: Request, res: Response) => {
  const { username } = req.body
  await db.insertUsername(username)
  res.redirect("/")
})

export { getUsernames, createUsername }
