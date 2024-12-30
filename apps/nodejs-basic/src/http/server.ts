import http from "node:http"
import path from "node:path"
import fs from "node:fs"
import process from "node:process"

function server(rootDirectory = process.cwd(), port = 8000) {
  const server = http.createServer()
  server.listen(port)

  console.log("Listening on port", port)

  server.on("request", (request, response) => {
    const endpoint = request.url && new URL(request.url).pathname

    if (endpoint) {
      switch (endpoint) {
        case "/test/mirror":
          {
            response.setHeader("Content-Type", "text/plain; charset=UTF-8")
            response.writeHead(200)
            response.write(
              `${request.method} ${request.url} HTTP/${request.httpVersion}\r\n`,
            )

            const headers = request.rawHeaders
            for (let i = 0; i < headers.length; i += 2) {
              response.write(`${headers[i]}: ${headers[i + 1]}\r\n`)
            }
            response.write("\r\n")
            request.pipe(response)
          }
          break
        default: {
          // 去掉开头的 /
          let filename = endpoint.substring(1)
          // 不允许路径中出现 '../'，发送根目录外部的文件是一个安全漏洞
          filename = filename.replace(/\.\.\//g, "")
          filename = path.resolve(rootDirectory, filename)

          let type
          switch (path.extname(filename)) {
            case ".html":
            case ".htm":
              type = "text/html"
              break
            case ".js":
              type = "text/javascript"
              break
            case ".css":
              type = "text/css"
              break
            case ".png":
              type = "image/png"
              break
            case ".txt":
              type = "text/plain"
              break
            // 未知的二进制文件，浏览器一般会提示用户下载文件，而不是试图解析或打开它。
            default:
              type = "application/octet-stream"
              break
          }
          const stream = fs.createReadStream(filename)
          stream.once("readable", () => {
            response.setHeader("Content-Type", type)
            response.writeHead(200)
            stream.pipe(response)
          })
          stream.on("error", (err) => {
            response.setHeader("Content-Type", "text/plain; charset=UTF-8")
            response.write(404)
            response.end(err.message)
          })
        }
      }
    }
  })
}

server()
