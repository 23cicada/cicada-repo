import fs from "fs"
import zlib from "zlib"
import * as process from "node:process"

function gzip(filename: string, callback: (err?: Error) => void) {
  const source = fs.createReadStream(filename)
  const destination = fs.createWriteStream(filename + ".gz")
  const gzipper = zlib.createGzip()

  source
    .on("error", callback)
    .pipe(gzipper) // 转换流：写入转换流的数据在同一个流会变成可读的（通常是某种转换后的形式）。
    .pipe(destination)
    .on("error", callback)
    .on("finish", callback)
}

const filePath = process.argv[1]
if (filePath) {
  gzip(filePath, (error) => {
    console.log(error)
  })
}
