import asyncHandler from "express-async-handler"
import * as db from "../db.ts"
import CustomNotFoundError from "../errors/CustomNotFoundError.ts"

const getAuthorById = asyncHandler(async (req, res) => {
  const { authorId } = req.params
  const author = await db.getAuthorById(Number(authorId))
  if (!author) {
    throw new CustomNotFoundError("Author not found")
  }
  res.send(`Author Name: ${author.name}`)
})

export { getAuthorById }
