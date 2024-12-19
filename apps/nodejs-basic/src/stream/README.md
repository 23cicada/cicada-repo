# Stream

## Node支持4种基本的流

- readable fs.createReadStream()
- writable fs.createWriteStream()
- duplex net.connect()
- transform zlib.createGzip()

流的实现几乎总会包含一个内部缓冲区，用于保存已经写入但尚未读取的数据。缓冲有助于保证在读取时有数据，而在写入时有空间保存数据。但这两点都无法绝对保证，基于流编程的本质决定了读取器有时候必须要等待数据写入（因为缓冲区空了），而写入器有时候必须等待数据读取（因为缓冲区满了）。

## pipe

把从流中读取的数据写入另一个流

## backpressure

在调用流的write()方法时，它始终会接收并缓冲传入的数据块。如果内部缓冲区未满，它会返回true。否则返回false。

write()方法返回false，表示向流中写入数据的速度超过了它的处理能力。此时应停止调用write()，直到流发出“drain”事件，表明缓冲区又有空间了。
