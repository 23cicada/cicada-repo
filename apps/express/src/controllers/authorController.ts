import asyncHandler from "express-async-handler"
import * as db from "../db.ts"
import ResourceNotFoundError from "../errors/ResourceNotFoundError.ts"

const getAuthorById = asyncHandler(async (req, res) => {
  const { authorId } = req.params
  const author = await db.getAuthorById(Number(authorId))
  if (!author) {
    throw new ResourceNotFoundError("Author not found")
  }
  res.send(`Author Name: ${author.name}`)
})

export { getAuthorById }
