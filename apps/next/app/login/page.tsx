'use client'
import { useActionState } from 'react'
import { login } from './action'

const Page = () => {
  const [error, formAction, isPending] = useActionState(login, [])
  return (
    <form action={formAction}>
      <h1>Login</h1>
      <label htmlFor="username">Username</label>
      <input id="username" name="username" placeholder="username" type="text" />
      <label htmlFor="password">Password</label>
      <input id="password" name="password" type="password" />
      <button type="submit" disabled={isPending}>
        {isPending ? 'Signing up...' : 'Sign Up'}
      </button>
      {error?.map((msg, index) => <p key={index}>{msg}</p>)}
    </form>
  )
}

export default Page
