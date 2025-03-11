import { StrictMode } from "react"
import { renderToPipeableStream } from "react-dom/server"
import { type EntryServerRender } from "./interface.ts"
import App from "./App.js"

const render: EntryServerRender = (url, options) => {
  return renderToPipeableStream(
    <StrictMode>
      <App />
    </StrictMode>,
    options,
  )
}

export default render
