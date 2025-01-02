# worker_threads

JavaScript线程（包括Node和浏览器中的线程）默认不共享内存，因此使用多线程的风险和困难对这些JavaScript中的 “工作线程” 并不适用。

> 多线程编程素来以困难著称。主要原因是需要仔细地同步线程对共享内存的访问。

在Node应用中使用工作线程主要有3个理由:

1. 你的应用需要执行的计算量超过一个CPU核心的能力，而线程可以让你把任务分配给多个核心，多核心今天已经是计算机的标配。如果你要通过Node做科学计算或机器学习或图形处理，那么可能需要使用多线程把更多计算力投向你的问题。
2. 即使你的应用不会用到一个CPU的全部能力，也可能需要多线程来维护主线程的快速响应能力。比如，服务器需要处理大型但相对不频繁的请求。假设服务器每秒只收到1个请求，但需要花费大约半秒钟（阻塞CPU）计算来处理每个请求。平均来看，有50%的时间空闲。但是如果在几毫秒内连续收到2个请求，服务器在响应完第一个请求后才能处理第二个请求。假如服务器使用工作线程执行计算，那么它可以很快响应两个请求，为客户端带来更好的体验。假设服务器运行在多核机器上，那它也可以并行计算两个响应的响应体。但即使只有一个核，使用工作线程仍然可以提升响应能力。
3. 通常，工作线程可以让我们把阻塞的同步操作转换为非阻塞的异步操作。如果你写的程序依赖遗留的代码，而该代码的同步操作无法避免，那在需要调用该遗留代码时也可以使用工作线程来避免阻塞。

## `MessageChannel`

自定义通信信道

```js
import threads from "node:worker_threads"

const channel = new threads.MessageChannel()

channel.port2.on("message", console.log)
channel.port1.postMessage("hello")
```

要让工作线程使用自定义通信信道，必须把其中一个端口从创建它们的线程转移到要使用它们的线程。

> MessagePort对象不能通过结构化克隆算法（postMessage()）复制，但它可以被转移。如果postMessage()的第一个参数已经包含了一个或多个MessagePort（在Message对象中嵌套任意深度），那么这些MessagePort对象必须也出现在作为第二个参数的数组中。这样做会告诉Node，它不需要制作MessagePort的副本，而是可以将已有的对象交给另一个线程。不过，要理解在线程间转移值，关键是要知道一个值一旦转移，那在调用postMessage()的线程里就不能再使用它了。

```js
import threads from "node:worker_threads"

const channel = new threads.MessageChannel()
worker.postMessage(
  {
    command: "changeChannel",
    data: channel.port1,
  },
  [channel.port1],
)

channel.port2.postMessage("Can you hear me now?")
channel.port2.on("message", handleMessagesFromWorker)
```

postMessage()也允许转移定型数组而不是复制它们。

在处理图片的场景中，主线程可以把图片的像素转移到工作线程，工作线程可以把处理之后的像素转移回主线程。这样就不必复制内存，只不过两个线程永远不可能同时访问一块内存。

```js
const pixels = new Uint32Array(1024 * 1024)
worker.postMessage(pixels, [pixels.buffer])
```

## `SharedArrayBuffer`

在线程间共享定型数组
