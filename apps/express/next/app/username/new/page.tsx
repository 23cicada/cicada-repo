"use client"
import { useActionState } from "react"
import { createUsername } from "./action"

const NewUsername = () => {
  const [message, action, isPending] = useActionState(createUsername, null)
  return (
    <form action={action}>
      <label htmlFor="username">Username: </label>
      <input id="username" name="username" placeholder="Username" />
      <button disabled={isPending} type="submit">
        {isPending ? "Creating..." : "New"}
      </button>
      {message?.map((error, index) => <p key={index}>{error}</p>)}
    </form>
  )
}

export default NewUsername
