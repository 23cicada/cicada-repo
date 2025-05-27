"use client"
import { useActionState } from "react"
import { login } from "./action"

const Page = () => {
  const [state, formAction, isPending] = useActionState(login, [])
  return (
    <form action={formAction}>
      <h1>Login</h1>
      <label htmlFor="username">Username</label>
      <input id="username" name="username" placeholder="username" type="text" />
      <label htmlFor="password">Password</label>
      <input id="password" name="password" type="password" />
      <button type="submit" disabled={isPending}>
        {isPending ? "Signing up..." : "Sign Up"}
      </button>
    </form>
  )
}

export default Page
