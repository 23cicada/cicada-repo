'use client'
import { useActionState } from 'react'
import { signUp } from '../action'

const Page = () => {
  const [errorMessage, formAction, isPending] = useActionState(signUp, null)
  return (
    <form action={formAction}>
      <h1>Sign Up</h1>
      <label>
        Username: <input name="username" placeholder="username" type="text" />
      </label>
      <br />
      <label>
        Password: <input name="password" type="password" />
      </label>
      <button type="submit" disabled={isPending}>
        {isPending ? 'Signing up...' : 'Sign Up'}
      </button>
      {errorMessage && <p>{errorMessage}</p>}
    </form>
  )
}

export default Page
