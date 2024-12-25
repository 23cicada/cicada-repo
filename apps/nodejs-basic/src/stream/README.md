# Stream

## Node支持4种基本的流

- readable fs.createReadStream()
- writable fs.createWriteStream()
- duplex net.connect()
- transform zlib.createGzip()

流的实现几乎总会包含一个内部缓冲区，用于保存已经写入但尚未读取的数据。缓冲有助于保证在读取时有数据，而在写入时有空间保存数据。但这两点都无法绝对保证，基于流编程的本质决定了读取器有时候必须要等待数据写入（因为缓冲区空了），而写入器有时候必须等待数据读取（因为缓冲区满了）。

## pipe

把从流中读取的数据写入另一个流。

## backpressure

在调用流的write()方法时，它始终会接收并缓冲传入的数据块。如果内部缓冲区未满，它会返回true，否则返回false。

write()方法返回false，表示向流中写入数据的速度超过了它的处理能力。此时应停止调用write()，直到流发出“drain”事件，表明缓冲区又有空间了。

## flowing and paused

- flowing mode

  注册“data”事件读取流（流会向“data”事件推送数据，注册前不会推送）。

  调用pause()暂时停止“data”事件。

  调用可读流的resume()方法，再次启动“data”事件。

  处于flowing mode的流会在到达流末尾时发出一个“end”事件。

- paused mode

  调用read()方法从流中读取数据，如果已经没有数据可读，会返回null。

  可读流在paused mode下会发送“readable”事件，表示流中有可读数据。

  必须在一个循环中反复调用read()，直到它返回null。只有这样才能完全耗尽流的缓冲区，从而在将来再次触发新的“readable”事件。

如果没有在程序中使用管道或异步迭代，那就需要从这两种基于事件的API中选择一种来处理流。

新创建的流开始时处于暂停模式。如果不注册“data”事件处理程序（注册“data”事件处理程序会把流切换为流动模式），也不调用pipe()方法，那么可读流就一直处于暂停模式。
