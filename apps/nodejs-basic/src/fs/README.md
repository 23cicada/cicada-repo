## 文件描述符

调用 `fs.open()` 或 `fs.openSync()` 函数可以得到指定文件的描述符。进程一次只能打开有限个数的文件，因此在完成操作后，一定要在文件描述符上调用 `fs.close()`。

如果想使用低级的 `fs.read()` 和` fs.write()` 函数，那么就需要打开文件来获取文件描述符（fd），然后才能在文件中跳转，读取或写入内容。

`fs.promises.open()` 会 resolve 一个 FileHandle 对象。这个FileHandle对象与文件描述符的作用相同。

## 读文件 - 直接读取

`fs.readFileSync()`

`fs.readFile()`

`fs.promises.readFile()`

如果需要在更低层次上控制要读取文件的哪些字节，可以打开文件取得文件描述符，然后再使用`fs.read()`、`fs.readSync()`或`fs.promises.read()` 函数。

## 写文件 - 直接写入

写入一个并不存在的文件名，可以创建一个新文件。

`fs.writeFileSync()`

`fs.writeFile()`

`fs.promises.writeFile()`

把数据追加到已有数据的末尾，而不会重写已有的文件内容：

`fs.appendFileSync()`

`fs.appendFile()`

`fs.promises.appendFile()`

如果想以多个块的形式将数据写入文件，并且想控制把每个块都写入文件中的确切位置，可以打开文件取得文件描述符，然后再使用`fs.write()`或`fs.writeSync()`函数。

> 如果文件很小，或者内存占用或性能并非主要考虑的因素，那么通过一次调用读取文件的全部内容是最简单的。

> 如果可以顺序地处理文件内容，同时不需要把文件内容全都放到内存中，那通过流来读取文件可能是最有效的方式。

## 文件模式

- w 写入
- w+ 读写
- wx 排他性写入，如果指定的文件存在则失败
- wx+ 排他性读写，如果指定的文件存在则失败
- a 追加
- a+ 读写追加

```javascript
// => fs.appendFileSync()
fs.writeFileSync("messages.log", "hello", { flag: "a" })

// 打开一个写入流，如果文件存在则抛出错误
fs.createWriteStream("message.log", { flags: "wx" })
```

> 各种文件写入函数在数据已经“写入”时（对Node而言就是把数据交给了操作系统），会返回或调用它们的回调或完成它们的promise。但这不一定意味着数据已经事实上写入了持久存储系统。至少其中有些数据仍然缓存在操作系统或设备驱动的某个地方，等待写入磁盘。如果想把数据强制写入磁盘，保证数据得到安全存储，可以使用 `fs.fsync()` 或 `fs.fsyncSync()`。这两个函数只接收文件描述符，没有接收路径的版本。

## 文件操作

| 功能         | Function        |
| ------------ | --------------- |
| 复制         | `fs.copyFile()` |
| 移动或重命名 | `fs.rename()`   |
| 创建硬链接   | `fs.link()`     |
| 创建符号链接 | `fs.symlink()`  |
| 删除         | `fs.unlink()`   |
| 文件元数据   | `fs.stat()`     |

```js
// COPYFILE_EXCL 参数表示只在新文件不存在时复制，可以防止复制操作重写已有的文件。
// COPYFILE_FICLONE ？
fs.constants.COPYFILE_FICLONE
fs.copyFile(
  "ch15.txt",
  "ch16.txt",
  fs.constants.COPYFILE_EXCL | fs.constants.COPYFILE_FICLONE,
  (err) => {},
)
```

元数据修改：

- `fs.chmod()` 设置文件或目录的“模式”或权限。
- `fs.chown()` 设置文件或目录的所有者和组（以ID形式）。
- `fs.utimes()` 和 `fs.futimes()` 设置文件或目录的访问时间和修改时间。

## 操作目录

| 功能            | Function       |
| --------------- | -------------- |
| 新建目录        | `fs.mkdir()`   |
| 新建临时目录    | `fs.mkdtemp()` |
| 删除目录        | `fs.rmdir()`   |
| 列出目录内容    | `fs.readdir()` |
| 列出目录内容-流 | `fs.opendir()` |

```js
// recursive: true，则会创建路径中所有不存在的目录
fs.mkdirSync("dist/lib", { recursive: true })
```

`fs.mkdtemp()` 接收一个传入的路径前缀，然后在后面追加一些随机字符（对于安全很重要），并以该名字创建一个目录，最后返回（或传给回调）这个目录的路径。

`fs.rmdir()` 必须是空目录才能删除。

使用 `fs.opendir()` 返回的Dir对象最简单的方式是将其作为异步迭代器，配合for/await循环。
