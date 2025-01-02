import threads from "node:worker_threads"
import { fileURLToPath } from "node:url"

interface Spline {
  reticulate?: () => void
  reticulated: boolean
}

// 把主线程和工作线程的代码放在同一个文件中
if (threads.isMainThread) {
  module.exports = function reticulateSplines(splines: Spline[]) {
    return new Promise((resolve, reject) => {
      const reticulate = new threads.Worker(fileURLToPath(import.meta.url))
      // 没有共享内存，JavaScript的工作线程只能通过消息传递来通信。
      reticulate.postMessage(splines)
      reticulate.on("message", resolve)
      reticulate.on("error", reject)
    })
  }
} else {
  threads.parentPort?.once("message", (splines: Spline[]) => {
    for (const spline of splines) {
      if (spline.reticulate) {
        spline.reticulate()
      } else {
        spline.reticulated = true
      }
    }
    threads.parentPort?.postMessage(splines)
  })
}
