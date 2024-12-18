// 命令行参数
console.log(process.argv)
// node src/process.ts --arg1 --arg2 filename
// [
//     'C:\\Program Files\\nodejs\\node.exe', -> Node可执行文件的路径
//     'C:\\Users\\name\\Desktop\\nodejs-basics\\src\\process.ts', -> JavaScript代码文件的路径
//     src/process.ts 之后的任何参数
//     '--arg1',
//     '--arg2',
//     'filename'
// ]

// 环境变量
console.log(process.env)

process.setUncaughtExceptionCaptureCallback((e) => {
  console.log("Uncaught exception:", e)
})

// 当用户在终端按下 Ctrl+C 时，Node.js 会触发 "SIGINT" 信号（而不会立即退出程序）。
process.on("SIGINT", () => {
  // 退出
  process.exit()
})
