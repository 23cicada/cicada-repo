import http from "node:http"
import path from "node:path"
import fs from "node:fs"
import { fileURLToPath } from "node:url"

const dirname = path.join(path.dirname(fileURLToPath(import.meta.url)), "src")

const server = http.createServer((req, res) => {
  req.on("error", (err) => {
    res.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" })
    res.end(`Bad Request: ${err.message}`)
  })

  res.on("error", (err) => {
    console.error("Response error:", err.message)
  })

  const endpoint = !req.url || req.url === "/" ? "/index" : req.url
  const filename = path.resolve(dirname, endpoint.substring(1) + ".html")

  fs.stat(filename, (err, stats) => {
    if (err || !stats.isFile()) {
      const notFoundPath = path.resolve(dirname, "404.html")
      fs.createReadStream(notFoundPath)
        .on("error", () => {
          res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" })
          res.end("500 Internal Server Error")
        })
        .pipe(res)
        .on("open", () => {
          res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" })
        })
      return
    }

    fs.createReadStream(filename)
      .on("error", () => {
        res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" })
        res.end("500 Internal Server Error")
      })
      .pipe(res)
      .on("open", () => {
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" })
      })
  })
})

server.listen(3000)
