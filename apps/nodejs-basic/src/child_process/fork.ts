import child_process from "node:child_process"
import { fileURLToPath } from "node:url"
import path from "node:path"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const child = child_process.fork(`${__dirname}/fork-child.ts`)

child.send({ x: 4, y: 3 })

child.on("message", (message: { hypotenuse: number }) => {
  console.log(message.hypotenuse)
  // 调用 disconnect 终止父进程与子进程的连接。
  child.disconnect()
})
