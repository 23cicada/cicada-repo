# `@repo/great-front-end`

# Javascript

## 位置、导航与历史

### `Window.location` & `Document.location`

使用 Location 对象创建 URL 对象，然后访问 searchParams 属性

```javascript
let url = new URL(window.location)
let query = url.searchParams.get("q")
```

对 location 对象的修改或调用 `location.replace(...)`, `location.reload()` 都会导致浏览器加载新文档（或重新加载），但 hash 不会导致浏览器加载新文档，只会把文档中id或name匹配该 hash 的元素滚动到浏览器窗口顶部。

`location = '#top'` 跳到文档顶部。

### `window.history`

History对象将窗口的浏览历史建模为文档和文档状态的列表。History对象的length属性是浏览历史列表中元素的数量。

出于安全考虑，脚本不能访问存储的URL（如果可以访问，任何脚本都将可以窥探你的浏览历史）。

- `history.back()`
- `history.forward()`
- `history.go(n)`

今天，Web应用经常动态生成或加载内容，显示新应用状态而并不真正加载新文档。**这样的应用必须自己管理历史记录，才能让用户直观地使用“后退”和“前进”按钮（或等价手势），从应用的一个状态导航到另一个状态**。有两种方式实现这个任务：

1. `location.hash` & `hashchange event`

设置 location.hash 为一个字符串（对应的应用新状态）。就会触发 `hashchange` 事件，显示应用新状态。使用这种迂回技术可以保证新状态被插入浏览历史，因而“后退”和“前进”按钮继续有效。

2. `history.pushState/replaceState(state, unused, url)` & `popstate event`

调用 `history.pushState()`，向浏览器历史中添加一个表示新状态的对象。单击“后退”按钮，浏览器会触发携带该保存的状态对象（使用结构化克隆算法保存）的 `popstate` 事件，使用该对象重建其之前的状态。url会立即在地址栏显示出来。

给每个状态都关联一个URL可以让用户收藏应用的内部状态。
