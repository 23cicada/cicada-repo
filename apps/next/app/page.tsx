'use client'

import Link from 'next/link'

const App = () => {
  return (
    <>
      <button>Log out</button>
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
