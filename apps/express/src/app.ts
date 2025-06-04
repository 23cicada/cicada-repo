import "dotenv/config"
import express from "express"
import path from "node:path"
import session from "express-session"
import passport from "passport"
import LocalStrategy from "passport-local"
import viewsRouter from "./routes/views/indexRouter.ts"
import errorHandler from "./controllers/errorController.ts"
import apiRouter from "./routes/index.ts"
import responseEnhancer from "./middlewares/responseEnhancer.ts"
import ensureAuthenticated from "./middlewares/ensureAuthenticated.ts"
import * as db from "#src/db/queries/index.ts"

const PORT = parseInt(process.env.PORT || "3001", 10)
const DEV = process.env.NODE_ENV !== "production"
const assetsPath = path.join(import.meta.dirname, "public")

const app = express()

app.set("views", path.join(import.meta.dirname, "views"))
app.set("view engine", "ejs")

/**
 * https://www.passportjs.org/concepts/authentication/sessions/
 */
app.use(session({ secret: "cats", resave: false, saveUninitialized: false }))
app.use(passport.session())

passport.serializeUser((user, done) => {
  done(null, user.id)
})
passport.deserializeUser(async (id: number, done) => {
  try {
    const user = await db.getUserById(id)
    done(null, user)
  } catch (err) {
    done(err)
  }
})

/**
 * https://www.passportjs.org/concepts/authentication/password/
 * This function is what will be called when we use the passport.authenticate() function later.
 */
passport.use(
  new LocalStrategy.Strategy(async (username, password, done) => {
    try {
      const user = await db.getUserByUsername(username)
      if (!user) {
        return done(null, false, { message: "Incorrect username" })
      }
      if (user.password !== password) {
        return done(null, false, { message: "Incorrect password" })
      }
      return done(null, user)
    } catch (err) {
      return done(err)
    }
  }),
)

// https://expressjs.com/en/5x/api.html#express.urlencoded
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(assetsPath))
app.use(responseEnhancer)
// app.use(ensureAuthenticated)

app.get("/", (_, res) => res.render("index", { title: "Home" }))
app.use("/views", viewsRouter)
app.use("/api", apiRouter)
app.use((_, res) => res.status(404).render("404"))
app.use(errorHandler)
app.listen(PORT, () => {
  console.log(
    `> Server listening at http://localhost:${PORT} as ${
      DEV ? "development" : process.env.NODE_ENV
    }`,
  )
})
