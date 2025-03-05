[生产环境构建-SSR](https://cn.vite.dev/guide/ssr#building-for-production)

1. 客户端构建
2. SSR 构建，使其通过 import() 直接加载，这样便无需再使用 Vite 的 ssrLoadModule

`--ssr` 标志表明这将会是一个 SSR 构建。同时需要指定 SSR 的入口。

`vite build` 默认情况下，它使用 `<root>`/index.html 作为其构建入口点，并生成能够静态部署的应用程序包。

```json
{
  "scripts": {
    "dev": "node server",
    "build:client": "vite build --outDir dist/client",
    "build:server": "vite build --outDir dist/server --ssr src/entry-server.js"
  }
}
```
