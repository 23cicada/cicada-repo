import fs from "node:fs"
import process from "node:process"

const buffer = fs.readFileSync("test.data")
const text = fs.readFileSync("data.csv", "utf-8")

fs.readFile("test.data", (err, buffer) => {
  if (err) {
    console.error(err)
  } else {
    // ...
  }
})

void fs.promises.readFile("data.csv", "utf-8").then().catch()

function printFile(filename: string, encoding: BufferEncoding = "utf-8") {
  fs.createReadStream(filename, encoding).pipe(process.stdout)
}
