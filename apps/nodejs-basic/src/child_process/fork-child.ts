import process from "node:process"

process.on("message", (message: { x: number; y: number }) => {
  process.send?.({
    hypotenuse: Math.hypot(message.x, message.y),
  })
})
