'use client'

import Link from 'next/link'
import { redirect } from 'next/navigation'

const App = () => {
  return (
    <>
      <button onClick={() => redirect(`/api/logout?manual=true`)}>
        Log out
      </button>
      <ul>
        <li>
          <Link href="/username">Username</Link>
        </li>
        <li>
          <Link href="/message-board">Message Board</Link>
        </li>
        <li>
          <Link href="/login/sign-up">Sign Up</Link>
        </li>
      </ul>
    </>
  )
}

export default App
