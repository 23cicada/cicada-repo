// db.js

const authors = [
  { id: 1, name: "Bryan" },
  { id: 2, name: "Christian" },
  { id: 3, name: "Jason" },
]

async function getAuthorById(authorId: number) {
  return Promise.resolve(authors.find((author) => author.id === authorId))
}

export { getAuthorById }
