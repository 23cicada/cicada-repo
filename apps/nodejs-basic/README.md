# `@repo/nodejs-basic`

## Node 默认异步

Node通过让其API默认异步和非阻塞实现了高层次的并发，同时保持了单线程的编程模型。

## 错误在先

Node诞生于JavaScript有Promise类之前，因此异步Node API是基于回调的。一般来说，你传给异步Node函数的最后一个参数始终是一个回调。Node使用错误在先的回调，而且通常调用时会传两个参数。如果没有发生错误，那么这个错误在先的回调的第一个参数通常是null，第二个参数就是你最初调用的异步函数产生的数据或返回的响应。

## [Running TypeScript Natively](https://nodejs.org/en/learn/typescript/run-natively#running-typescript-natively)

`--experimental-strip-types`

`--experimental-transform-types`

```shell
node --experimental-strip-types --experimental-transform-types --disable-warning=ExperimentalWarning xxx.ts
```

## Debugging Node.js

[JeBrains WebStorm](https://nodejs.org/en/learn/getting-started/debugging#jetbrains-webstorm-and-other-jetbrains-ides)

> `--inspect` will be used by default for Node.js 7+.

## Environment-variables
```text
# .env file
PORT=3000

process.env.PORT // "3000"

node --env-file=.env app.js
```

> Node.js 20 introduced experimental support for .env files.

## `url.parse()` & `URL` object

```text
┌────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                              href                                              │
├──────────┬──┬─────────────────────┬────────────────────────┬───────────────────────────┬───────┤
│ protocol │  │        auth         │          host          │           path            │ hash  │
│          │  │                     ├─────────────────┬──────┼──────────┬────────────────┤       │
│          │  │                     │    hostname     │ port │ pathname │     search     │       │
│          │  │                     │                 │      │          ├─┬──────────────┤       │
│          │  │                     │                 │      │          │ │    query     │       │
"  https:   //    user   :   pass   @ sub.example.com : 8080   /p/a/t/h  ?  query=string   #hash "
│          │  │          │          │    hostname     │ port │          │                │       │
│          │  │          │          ├─────────────────┴──────┤          │                │       │
│ protocol │  │ username │ password │          host          │          │                │       │
├──────────┴──┼──────────┴──────────┼────────────────────────┤          │                │       │
│   origin    │                     │         origin         │ pathname │     search     │ hash  │
├─────────────┴─────────────────────┴────────────────────────┴──────────┴────────────────┴───────┤
│                                              href                                              │
└────────────────────────────────────────────────────────────────────────────────────────────────┘
```
