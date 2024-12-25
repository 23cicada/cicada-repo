import fs from "node:fs"
import crypto from "crypto"
import path from "node:path"

function sha256(
  filename: string,
  callback: (err: Error | null, hash: string) => void,
) {
  const input = fs.createReadStream(path.resolve(filename))
  const hasher = crypto.createHash("sha256")

  input.on("readable", () => {
    let chunk
    while ((chunk = input.read() as Buffer | null)) {
      hasher.update(chunk)
    }
  })

  input.on("end", () => {
    const hash = hasher.digest("hex")
    callback(null, hash)
  })

  input.on("error", callback)
}

const filename = process.argv[2]
if (filename) {
  sha256(filename, (err, hash) => {
    if (err) {
      console.error(err.toString())
    } else {
      console.log(hash)
    }
  })
}
