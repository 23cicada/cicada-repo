"use client"

import { useState } from "react"

const App = () => {
  const [count, setCount] = useState(0)
  return (
    <div>
      <img />
      Hello World!
      <button onClick={() => setCount(count + 1)}>{count}</button>
    </div>
  )
}

export default App
