import asyncHandler from "express-async-handler"
import { NotFoundError } from "../errors/NotFoundError.ts"

async function getMockAuthorById(authorId: number) {
  const authors = [
    { id: 1, name: "Bryan" },
    { id: 2, name: "Christian" },
    { id: 3, name: "Jason" },
  ]
  return Promise.resolve(authors.find((author) => author.id === authorId))
}

const getAuthorById = asyncHandler(async (req, res) => {
  const { authorId } = req.params
  const author = await getMockAuthorById(Number(authorId))
  if (!author) {
    throw new NotFoundError("Author not found")
  }
  res.send(`Author Name: ${author.name}`)
})

export { getAuthorById }
