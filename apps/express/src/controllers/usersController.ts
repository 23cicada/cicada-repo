import usersStorage from "../storages/usersStorage.ts"
import type { UserInfo, UserSearchParams } from "../interface.ts"
import { body, validationResult, query } from "express-validator"
import type { Request, Response } from "express"
import { NotFoundError } from "../errors/index.ts"

const alphaErr = "must only contain letters."
const lengthErr = "must be between 1 and 10 characters."

const validateUser = [
  body("firstName")
    .trim()
    .isAlpha()
    .withMessage(`First Name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`First name ${lengthErr}`),
  body("lastName")
    .trim()
    .isAlpha()
    .withMessage(`Last Name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`Last name ${lengthErr}`),
  body("email")
    .trim()
    .isEmail()
    .withMessage("Email must be formatted properly."),
  body("age")
    .optional({ values: "falsy" })
    .isInt({ min: 18, max: 120 })
    .withMessage("Age must be a number between 18 and 120."),
  body("bio")
    .trim()
    .optional()
    .isLength({ max: 200 })
    .withMessage("Bio must be at most 200 characters."),
]

const usersListGet = (req: Request, res: Response) => {
  res.render("users/index", {
    title: "User list",
    users: usersStorage.getUsers(),
  })
}

const usersCreateGet = (req: Request, res: Response) => {
  res.render("users/createUser", {
    title: "Create user",
  })
}

const usersCreatePost = [
  ...validateUser,
  (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(400).render("users/createUser", {
        title: "Create user",
        errors: errors.array(),
      })
      return
    }
    const { firstName, lastName, email, age, bio } = req.body as UserInfo
    usersStorage.addUser({
      firstName,
      lastName,
      email,
      age,
      bio,
    })
    res.redirect("/users")
  },
]

const usersUpdateGet = (req: Request, res: Response) => {
  const userId = req.params.id!
  const user = usersStorage.getUser(userId)
  if (!user) {
    throw new NotFoundError()
  }
  res.render("users/updateUser", {
    title: "Update user",
    user: user,
  })
}

const usersUpdatePost = [
  ...validateUser,
  (req: Request, res: Response) => {
    const userId = req.params.id!
    const user = usersStorage.getUser(userId)
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(400).render("users/updateUser", {
        title: "Update user",
        user: user,
        errors: errors.array(),
      })
      return
    }
    const { firstName, lastName, email, age, bio } = req.body as UserInfo
    usersStorage.updateUser(userId, {
      firstName,
      lastName,
      email,
      age,
      bio,
    })
    res.redirect("/users")
  },
]

const usersDeletePost = (req: Request, res: Response) => {
  usersStorage.deleteUser(req.params.id!)
  res.redirect("/users")
}

const usersSearchGet = [
  query("name")
    .trim()
    .optional()
    .isString()
    .withMessage("Name must be a string."),
  query("email")
    .trim()
    .optional({ values: "falsy" })
    .isEmail()
    .withMessage("Invalid email format."),
  body().custom((_, { req }) => {
    const { email, name } = req.query as UserSearchParams
    if (!email && !name) {
      throw new Error("At least one of name or email must be provided.")
    }
    return true
  }),
  (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.render("users/index", {
        title: "User list",
        users: usersStorage.getUsers(),
        errors: errors.array(),
      })
      return
    }
    const { email, name } = req.query as UserSearchParams
    const users = usersStorage.searchUser({ email, name })
    res.render("users/search.ejs", {
      title: "Search result",
      users,
    })
  },
]

export {
  usersListGet,
  usersCreateGet,
  usersCreatePost,
  usersUpdateGet,
  usersUpdatePost,
  usersDeletePost,
  usersSearchGet,
}
