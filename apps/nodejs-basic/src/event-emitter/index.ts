import EventEmitter from "events"

const myEmitter = new EventEmitter()

// 注册事件处理程序
myEmitter.on("event", () => {
  console.log("Handler 1")
})

myEmitter.on("event", () => {
  console.log("Handler 2")
})

// 触发事件
console.log("Before emit")
myEmitter.emit("event")
console.log("After emit")

// =>
// Before emit
// Handler 1
// Handler 2
// After emit
