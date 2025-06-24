'use client'
import { useActionState, use } from 'react'
import { login } from './action'

interface PageProps {
  searchParams: Promise<{ redirect?: string }>
}
const Page = ({ searchParams }: PageProps) => {
  const { redirect } = use(searchParams)
  const [errorMessage, formAction, isPending] = useActionState(
    login.bind(null, redirect ?? '/'),
    null,
  )
  return (
    <form action={formAction}>
      <h1>Login</h1>
      <div>
        <label htmlFor="username">Username: </label>
        <input
          id="username"
          name="username"
          placeholder="username"
          type="text"
        />
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <input id="password" name="password" type="password" />
      </div>
      <button type="submit" disabled={isPending}>
        {isPending ? 'Signing up...' : 'Sign Up'}
      </button>
      {errorMessage && <p>{errorMessage}</p>}
    </form>
  )
}

export default Page
