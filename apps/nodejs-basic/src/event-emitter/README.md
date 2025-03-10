# EventEmitter

`emitter.emit()`

`emitter.once()`

`emitter.on()` / `emitter.addListener()`

`emitter.off()` / `emitter.removeListener()`

`emitter.removeAllListeners()`

当某个EventEmitter对象上发生特定的事件时， Node会调用在该EventEmitter上针对该事件类型注册的所有处理程序。
调用顺序是注册的顺序。如果有多个处理程序，它们会在一个线程上被顺序调用。注意，Node没有并行调用。更重要的，事件处理程序会被同步调用，而非异步调用。这意味着emit()方法不会把事件处理程序排队到将来某个时刻再调用。emit()会调用所有注册的处理程序（一个接一个），并且会在最后一个事件处理程序返回之后返回。

如果你的事件处理程序调用了fs.readFileSync()之类的阻塞函数，那么在该函数同步读完文件之前，不会执行后续的事件处理程序。

大多数EventEmitter都会定义一个“error”事件。只要使用基于事件的API，就应该习惯性地为这个“error”事件注册处理程序。
