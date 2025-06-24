'use client'
import { useActionState } from 'react'
import { signUp } from '../action'

const Page = () => {
  const [errorMessage, formAction, isPending] = useActionState(signUp, null)
  return (
    <form action={formAction}>
      <h1>Sign Up</h1>
      <label htmlFor="username">Username</label>
      <input id="username" name="username" placeholder="username" type="text" />
      <label htmlFor="password">Password</label>
      <input id="password" name="password" type="password" />
      <button type="submit" disabled={isPending}>
        {isPending ? 'Signing up...' : 'Sign Up'}
      </button>
      {errorMessage && <p>{errorMessage}</p>}
    </form>
  )
}

export default Page
