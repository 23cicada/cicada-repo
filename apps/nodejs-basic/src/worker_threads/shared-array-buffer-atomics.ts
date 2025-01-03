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
    for (let i = 0; i < 10_000_000; i++) {
      Atomics.add(sharedArray, 0, 1)
    }

    worker.on("message", () => {
      console.log(Atomics.load(sharedArray, 0)) // => 20000000
    })
  })
} else {
  const sharedArray = threads.workerData as Int32Array
  for (let i = 0; i < 10_000_000; i++) {
    Atomics.add(sharedArray, 0, 1)
  }
  threads.parentPort?.postMessage("done")
}
