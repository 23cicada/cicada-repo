"use client"
import { useActionState } from "react"
import { signUp } from "../action"

const Page = () => {
  const [state, formAction, isPending] = useActionState(signUp, [])
  return (
    <form action={formAction}>
      <h1>Sign Up</h1>
      <label htmlFor="username">Username</label>
      <input id="username" name="username" placeholder="username" type="text" />
      <label htmlFor="password">Password</label>
      <input id="password" name="password" type="password" />
      <button type="submit" disabled={isPending}>
        {isPending ? "Signing up..." : "Sign Up"}
      </button>
      {state.map((error, index) => (
        <p key={index}>{error}</p>
      ))}
    </form>
  )
}

export default Page
