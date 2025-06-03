"use client"
import { useEffect } from "react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <h3>Code: {error.message}</h3>
      <button onClick={() => reset()}>Try again</button>
    </div>
  )
}
