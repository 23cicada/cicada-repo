import threads from "node:worker_threads"
import { fileURLToPath } from "node:url"

if (threads.isMainThread) {
  const sharedBuffer = new SharedArrayBuffer(4)
  const sharedArray = new Int32Array(sharedBuffer)

  const worker = new threads.Worker(fileURLToPath(import.meta.url), {
    workerData: sharedArray,
  })

  // The 'online' event is emitted when the worker thread has started executing JavaScript code.
  worker.on("online", () => {
    for (let i = 0; i < 100_000_000; i++) {
      if (typeof sharedArray[0] === "number") sharedArray[0]++
    }

    worker.on("message", () => {
      console.log(sharedArray[0]) // => 113187377
    })
  })
} else {
  const sharedArray = threads.workerData as Int32Array
  for (let i = 0; i < 100_000_000; i++) {
    if (typeof sharedArray[0] === "number") sharedArray[0]++
  }
  threads.parentPort?.postMessage("done")
}
