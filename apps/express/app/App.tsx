import reactLogo from "./assets/react.svg"
import { useState } from "react"
import testImg from "./assets/IMG.png"

const App = () => {
  const [count, setCount] = useState(0)
  return (
    <div>
      hhhhh
      <img src={testImg} className="logo react" alt="React logo" />
      <img src={reactLogo} className="logo react" alt="React logo" />
      <button
        onClick={() => {
          setCount(count + 1)
          console.log(count)
        }}
      >
        Click me
      </button>
      <p>Count: {count}</p>
    </div>
  )
}

export default App
