# `@repo/great-front-end`

## Javascript

### 位置、导航与历史

#### `Window.location` & `Document.location`

使用 Location 对象创建 URL 对象，然后访问 searchParams 属性

```javascript
let url = new URL(window.location)
let query = url.searchParams.get("q")
```

对 location 对象的修改或调用 `location.replace(...)`, `location.reload()` 都会导致浏览器加载新文档（或重新加载），但 hash 不会导致浏览器加载新文档，只会把文档中id或name匹配该 hash 的元素滚动到浏览器窗口顶部。

`location = '#top'` 跳到文档顶部

#### `window.history`

History对象将窗口的浏览历史建模为文档和文档状态的列表。History对象的length属性是浏览历史列表中元素的数量。但出于安全考虑，脚本不能访问存储的URL（如果可以访问，任何脚本都将可以窥探你的浏览历史）

- `history.back()`
- `history.forward()`
- `history.go(n)`

今天，Web应用经常动态生成或加载内容，显示新应用状态而并不真正加载新文档。这样的应用必须自己管理历史记录，才能让用户直观地使用“后退”和“前进”按钮（或等价手势），从应用的一个状态导航到另一个状态。有两种方式实现这个任务。

1. `location.hash` & `hashchange`

如果用户的交互会导致应用进入新状态（比如单击链接），不要直接渲染新状态。而要先把新状态编码为一个字符串，并将location.hash设置为该字符串。这样就会触发“hashchange”事件，而你为该事件注册的事件处理程序将会显示该新状态。使用这种迂回技术可以保证新状态被插入浏览历史，因而“后退”和“前进”按钮继续有效。
