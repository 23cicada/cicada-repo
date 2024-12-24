import fs from "node:fs"
import process from "node:process"
import path from "node:path"

function copyFile(
  sourceFilename: string,
  destinationFilename: string,
  callback: (error: Error | null) => void,
) {
  const input = fs.createReadStream(path.resolve(sourceFilename))
  const output = fs.createWriteStream(path.resolve(destinationFilename))

  input.on("data", (chunk) => {
    const hasMoreRoom = output.write(chunk)
    if (!hasMoreRoom) {
      input.pause()
    }
  })

  input.on("end", () => {
    output.end() // 触发 finish 事件
  })

  input.on("error", (err) => {
    callback(err)
    process.exit()
  })

  output.on("drain", () => {
    input.resume()
  })

  output.on("finish", () => {
    callback(null)
  })

  output.on("error", (err) => {
    callback(err)
    process.exit()
  })
}

// pnpm dev src/stream/flowing-mode.ts ./src/stream/source.txt ./src/stream/destination.txt
const from = process.argv[2],
  to = process.argv[3]

if (from && to) {
  copyFile(from, to, (err) => {
    if (err) {
      console.error(err)
    } else {
      console.log("done.")
    }
  })
}
