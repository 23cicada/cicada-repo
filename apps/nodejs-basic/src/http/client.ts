import https, { RequestOptions } from "node:https"

function postJSON(
  host: string,
  endpoint: string,
  body: object,
  port: number,
  userName: string,
  password: string,
) {
  return new Promise((resolve, reject) => {
    const bodyText = JSON.stringify(body)
    const requestOptions: RequestOptions = {
      method: "POST",
      host,
      path: endpoint,
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(bodyText),
      },
    }

    if (port) {
      requestOptions.port = port
    }

    if (userName && password) {
      requestOptions.auth = `${userName}:${password}`
    }

    const request = https.request(requestOptions)
    request.write(bodyText)
    request.end()

    request.on("error", (err) => {
      reject(err)
    })
    request.on("response", (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`HTTP status ${response.statusCode ?? "unknown"}`))
        // 如果不订阅 data 事件或调用 response.resume()，流会停留在暂停（paused）模式并阻止资源回收。
        response.resume()
      }
      response.setEncoding("utf-8")
      let body = ""
      response.on("data", (chunk) => {
        body += chunk as string
      })
      response.on("end", () => {
        try {
          resolve(JSON.parse(body))
        } catch (e) {
          // https://github.com/microsoft/TypeScript/pull/41013
          // https://stackoverflow.com/questions/54649465/how-to-do-try-catch-and-finally-statements-in-typescript
          if (e instanceof Error) {
            reject(e)
          } else if (typeof e === "string") {
            reject(new Error(e))
          }
        }
      })
    })
  })
}
