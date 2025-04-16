import fs from 'node:fs/promises'
import express from 'express'
import { Transform } from 'node:stream'

// Constants
const isProduction = process.env.NODE_ENV === 'production'
const port = process.env.PORT || 5173
const base = process.env.BASE || '/'
const ABORT_DELAY = 10000

// Cached production assets
const templateHtml = isProduction
  ? await fs.readFile('./dist/client/index.html', 'utf-8')
  : ''

// Create http server
const app = express()

// Add Vite or respective production middlewares
/** @type {import('vite').ViteDevServer | undefined} */
let vite
if (!isProduction) {
  // 以中间件模式创建 Vite 服务器
  const { createServer } = await import('vite')
  vite = await createServer({
    server: { middlewareMode: true },
    // 这将禁用 Vite 自身的 HTML 服务逻辑
    // 并让上级服务器接管控制
    appType: 'custom',
    base,
  })
  app.use(vite.middlewares)
} else {
  // 将 vite 开发服务器的创建和所有使用都移到 dev-only 条件分支后面，
  // 然后添加静态文件服务中间件来服务 dist/client 中的文件。
  const compression = (await import('compression')).default
  const sirv = (await import('sirv')).default
  app.use(compression())
  app.use(base, sirv('./dist/client', { extensions: [] }))
}

// Serve HTML
app.use('*all', async (req, res) => {
  try {
    const url = req.originalUrl.replace(base, '')

    /** @type {string} */
    let template
    /** @type {import('./src/entry-server.ts').render} */
    let render
    if (!isProduction) {
      // 1. 读取 index.html
      // Always read fresh template in development
      template = await fs.readFile('./index.html', 'utf-8')
      // 2. 应用 Vite HTML 转换
      // 在开发环境中，vite.transformIndexHtml 用于处理和转换 HTML 文件。
      // 它应用所有配置的 Vite 插件中的 HTML 转换，并处理和重写 HTML 中的资源 URL。
      // Vite 使用这个 URL 来正确解析和重写 HTML 模板中的资源路径
      // 确保所有相对路径都能根据当前请求的 URL 正确解析
      template = await vite.transformIndexHtml(url, template)
      // 3. 加载服务器入口
      // 加载服务器入口。vite.ssrLoadModule 将自动转换
      // 你的 ESM 源码使之可以在 Node.js 中运行！无需打包
      // 并提供了一种高效的模块失效机制，类似于模块热替换（HMR）。
      render = (await vite.ssrLoadModule('/src/entry-server.tsx')).render
    } else {
      // 使用 dist/client/index.html 作为模板，
      // 而不是根目录的 index.html，因为前者包含了到客户端构建的正确资源链接。
      template = templateHtml
      // 使用 import('./dist/server/entry-server.js') （该文件是 SSR 构建产物），
      // 而不是使用 await vite.ssrLoadModule('/src/entry-server.js')。
      render = (await import('./dist/server/entry-server.js')).render
    }

    let didError = false

    // 4. 渲染应用的 HTML。
    const { pipe, abort } = render(url, {
      onShellError() {
        res.status(500)
        res.set({ 'Content-Type': 'text/html' })
        res.send('<h1>Something went wrong</h1>')
      },
      onShellReady() {
        res.status(didError ? 500 : 200)
        res.set({ 'Content-Type': 'text/html' })

        // Streaming HTML (流式 HTML) & Progressive Rendering (渐进式渲染)
        // Streaming HTML 通过服务器逐步发送 HTML 片段，
        // 使浏览器可以边接收边解析和渲染页面，而不必等到完整的 HTML 文档加载完成。
        const transformStream = new Transform({
          transform(chunk, encoding, callback) {
            res.write(chunk, encoding)
            callback()
          },
        })

        const [htmlStart, htmlEnd] = template.split(`<!--app-html-->`)

        res.write(htmlStart)

        transformStream.on('finish', () => {
          res.end(htmlEnd)
        })

        pipe(transformStream)
      },
      onError(error) {
        didError = true
        console.error(error)
      },
    })

    setTimeout(() => {
      abort()
    }, ABORT_DELAY)
  } catch (e) {
    // 如果捕获到了一个错误，让 Vite 来修复该堆栈，这样它就可以映射回你的实际源码中。
    vite?.ssrFixStacktrace(e)
    console.log(e.stack)
    res.status(500).end(e.stack)
  }
})

// Start http server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
})
