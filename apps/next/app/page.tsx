'use client'

import Link from 'next/link'
import { redirect } from 'next/navigation'

const App = () => {
  return (
    <>
      <button onClick={() => redirect('/api')}>Log out</button>
      <ul>
        <li>
          <Link href="/username">Username</Link>
        </li>
        <li>
          <Link href="/login/sign-up">Sign Up</Link>
        </li>
      </ul>
    </>
  )
}

export default App
