import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

console.table({
  "process.cwd()": process.cwd(),
  __filename: __filename,
  __dirname: __dirname,
  "process.argv[1]": process.argv[1],
  "import.meta.url": import.meta.url,
})

// ┌─────────────────┬───────────────────────────────────────────────────────────────────────────────────────────────┐
// │ (index)         │ Values                                                                                        │
// ├─────────────────┼───────────────────────────────────────────────────────────────────────────────────────────────┤
// │ process.cwd()   │ 'C:\\Users\\xxxxxxx\\Desktop\\turbo-yarn\\cicada-repo\\apps\\nodejs-basic'                    │
// │ __filename      │ 'C:\\Users\\xxxxxxx\\Desktop\\turbo-yarn\\cicada-repo\\apps\\nodejs-basic\\src\\fs\\index.ts' │
// │ __dirname       │ 'C:\\Users\\xxxxxxx\\Desktop\\turbo-yarn\\cicada-repo\\apps\\nodejs-basic\\src\\fs'           │
// │ process.argv[1] │ 'C:\\Users\\xxxxxxx\\Desktop\\turbo-yarn\\cicada-repo\\apps\\nodejs-basic\\src\\fs\\index.ts' │
// │ import.meta.url │ 'file:///C:/Users/xxxxxxx/Desktop/turbo-yarn/cicada-repo/apps/nodejs-basic/src/fs/index.ts'   │
// └─────────────────┴───────────────────────────────────────────────────────────────────────────────────────────────┘

const p = fileURLToPath(import.meta.url)

console.table({
  p: p,
  "path.basename(p)": path.basename(p),
  "path.extname(p)": path.extname(p),
  "path.dirname(p)": path.dirname(p),
})

// ┌──────────────────┬──────────────────────────────────────────────────────────────────────────────────────────────┐
// │ (index)          │ Values                                                                                       │
// ├──────────────────┼──────────────────────────────────────────────────────────────────────────────────────────────┤
// │ p                │ 'C:\\Users\\xxxxxxx\\Desktop\\turbo-yarn\\cicada-repo\\apps\\nodejs-basic\\src\\fs\\path.ts' │
// │ path.basename(p) │ 'path.ts'                                                                                    │
// │ path.extname(p)  │ '.ts'                                                                                        │
// │ path.dirname(p)  │ 'C:\\Users\\xxxxxxx\\Desktop\\turbo-yarn\\cicada-repo\\apps\\nodejs-basic\\src\\fs'          │
// └──────────────────┴──────────────────────────────────────────────────────────────────────────────────────────────┘

console.table({
  "path.normalize('a/b/c/../d')": path.normalize("a/b/c/../d"),
  "path.join('src', 'pkg', 't.js')": path.join("src", "pkg", "t.js"),
  "path.resolve()": path.resolve(), // => process.cwd()
  "path.resolve('t.js')": path.resolve("t.js"), // => path.join(process.cwd(), 't.js')
  "path.resolve('/a', '/b', 't.js')": path.resolve("/a", "/b", "t.js"),
})

// ┌──────────────────────────────────┬──────────────────────────────────────────────────────────────────────────────────┐
// │ (index)                          │ Values                                                                           │
// ├──────────────────────────────────┼──────────────────────────────────────────────────────────────────────────────────┤
// │ path.normalize('a/b/c/../d')     │ 'a\\b\\d'                                                                        │
// │ path.join('src', 'pkg', 't.js')  │ 'src\\pkg\\t.js'                                                                 │
// │ path.resolve()                   │ 'C:\\Users\\xxxxxxx\\Desktop\\turbo-yarn\\cicada-repo\\apps\\nodejs-basic'       │
// │ path.resolve('t.js')             │ 'C:\\Users\\xxxxxxx\\Desktop\\turbo-yarn\\cicada-repo\\apps\\nodejs-basic\\t.js' │
// │ path.resolve('/a', '/b', 't.js') │ 'C:\\b\\t.js'                                                                    │
// └──────────────────────────────────┴──────────────────────────────────────────────────────────────────────────────────┘

// resolve() 接收一个或多个路径片段，返回一个绝对路径。
// 从最后一个参数开始，反向处理，直到构建起绝对路径或者相对于process.cwd()解析得到绝对路径。
