'use client'
import { useActionState, use } from 'react'
import api from '@/utils/request'
import { redirect } from 'next/navigation'
import { login } from './action'

interface PageProps {
  searchParams: Promise<{ redirect?: string }>
}
const Page = ({ searchParams }: PageProps) => {
  // https://nextjs.org/docs/app/api-reference/file-conventions/page#reading-searchparams-and-params-in-client-components
  const { redirect: redirectUrl } = use(searchParams)

  const [errorMessage, formAction, isPending] = useActionState(
    async (prev: unknown, formData: FormData) => {
      const username = formData.get('username') as string
      const password = formData.get('password') as string
      const { success, error } = await api.login(username, password)
      if (success) {
        redirect(redirectUrl ?? '/')
      } else {
        return error.message
      }
    },
    '',
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
