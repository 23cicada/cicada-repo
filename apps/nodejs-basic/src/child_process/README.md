## child_process

Node中的child_process模块定义了一些函数，用于在子进程中运行其他程序。

`child_process.execSync()`

`child_process.execFileSync()`

`child_process.exec()`

`child_process.execFile()`

`child_process.spawn()`: 函数允许在子进程运行期间流式访问子进程的输出。

### `ChildProcess` 对象

`exec()` 、 `execFile()` 和 `spawn()` 都会返回一个 `ChildProcess` 对象。

`ChildProcess` 对象是一个event emitter，可以监听子进程退出时发出的“exit”事件。

`ChildProcess` 对象也有3个流属性:

- stdout（可读流）
- stderr（可读流）

  当子进程写入自己的标准输出和标准错误流时，相应的输出通过ChildProcess流变成可读的。

- stdin（可写流）

  写入这个流的任何数据都将进入子进程的标准输入。
