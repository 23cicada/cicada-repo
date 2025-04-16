step1 fetch data (server): 获取渲染页面所需的初始数据

step2 render to HTML (server): 生成纯静态 HTML (Shell)，不包含交互功能

step3 load code (client): 加载 JavaScript bundle

step4 hydrate (client): 将事件处理绑定到 HTML 元素上，使静态 HTML 变为可交互的应用

> It's like watering the "dry" HTML with the "water" of interactivity and event handlers.

这个过程的关键在于：每个步骤都必须等待整个应用完成当前步骤后，才能开始下一个步骤。

React 18 通过 `<Suspense>` 组件可以将应用拆分成多个独立的单元，每个单元都能独立完成这些步骤，而不会阻塞应用的其他部分。

## Problems

### 1. You have to fetch everything before you can show anything (step1 -> step2)

假设渲染一篇带评论的文章。评论内容很重要，你希望在服务器端 HTML 输出中包含它们。但是如果数据库或 API 响应很慢，你就面临两个选择：

1. 如果不在服务器端输出评论，用户需要等到 JS 加载完才能看到评论
2. 如果要在服务器端输出评论，就必须等评论数据加载完才能发送整个 HTML（包括导航栏、侧边栏、文章内容等）

这两种选择都不够理想。

**Streaming HTML 解决方案:**

可以用 Suspense 将评论包裹起来，我们告诉 React 不需要等待评论加载，就可以开始流式传输页面的其余部分的 HTML。相反，React 会先发送一个占位符（如一个加载指示器）来替代评论内容。当服务器上的评论数据准备就绪时，React 会将额外的 HTML 发送到同一数据流中，并附带一个最小化的内联 `<script>` 标签，将这些 HTML 插入到正确的位置。因此，即使 React 还未在客户端完全加载，延迟到达的评论 HTML 也会自动填充到页面中，带来更流畅的用户体验。

### 2. You have to load everything before you can hydrate anything (step3 -> step4)

假设评论组件包含了很多复杂的交互逻辑，它的 JavaScript 代码需要较长时间加载。这时你又要面临一个艰难的选择：

1. 为了让用户尽早看到评论，你希望在服务器端将评论渲染成 HTML
2. 但是由于目前的水合（hydration）过程只能一次性完成，你必须等到评论组件的代码加载完成后，才能开始给导航栏、侧边栏和文章内容进行水合

虽然你可以使用代码分割（code splitting）来单独加载评论组件，但这样就必须把评论从服务器端 HTML 中排除掉。因为如果服务器端渲染了评论的 HTML，而客户端还没有对应的代码，React 就不知道如何处理这部分 HTML，会在水合过程中删除它。

**Selective Hydration 解决方案:**

通过将评论包裹在 `<Suspense>` 中(`React.lazy`)，告诉 React 它们不应该阻塞页面的其余部分进行流式渲染，而且实际上也不会阻塞 Hydration！不再需要等待所有代码加载完毕才能开始 Hydration。React 可以在组件加载的同时对其进行部分 Hydration，从而加快页面的交互就绪时间。

### 3. You have to hydrate everything before you can interact with anything (step4)

假设评论组件有复杂的渲染逻辑。这些逻辑在你的电脑上可能运行得很快，但在低端设备上执行这些逻辑的成本很高，甚至可能导致屏幕卡顿几秒钟。

理想情况下，我们当然希望客户端完全不需要执行这么重的逻辑（这正是服务器组件 Server Components 要解决的问题）。但有些逻辑是无法避免的，因为它们决定了事件处理器的行为，这对于实现交互功能来说是必需的。

结果就是，一旦开始水合过程，用户就无法与导航栏、侧边栏或文章内容进行交互，直到整个组件树都完成水合。对于导航功能来说，这个问题特别糟糕 —— 用户可能想离开当前页面，但由于我们正忙于水合过程，他们被迫停留在一个他们已经不想看的页面上。


Hydrating the page before all the HTML has been streamed
   - If the JavaScript code loads earlier than all HTML, React doesn't have a reason to wait! It will hydrate the rest of the page.

Interacting with the page before all the components have hydrated
   - React 会尽可能早地开始水合过程，基于用户的交互行为，优先处理页面中最急需响应的部分。
   - 随着你在应用中更多地使用 Suspense，组件边界会变得更细粒度，这种选择性水合的优势就会更加明显。
   - 这意味着用户可以更快地与页面进行交互，而不必等待整个页面完成水合过程。
   - 比如用户点击了某个按钮，React 会优先完成这个区域的水合，让用户能够立即得到响应。

## 在 React 18 中，有两个由 Suspense 解锁的主要服务器端渲染（SSR）特性:

1. Streaming HTML on the server (`renderToPipeableStream`):
   - 允许你尽早开始发送 HTML，并在需要时继续流式传输额外的内容
   - 同时附带 `<script>` 标签，以确保这些内容被正确插入到页面中

2. Selective Hydration on the client (`hydrateRoot` + `Suspense`):
   - 使得应用可以尽早开始 Hydration，而无需等待所有 HTML 和 JavaScript 代码完全下载
   - 它还能优先 Hydrate 用户正在交互的部分，从而营造出"即时 Hydration"的流畅体验
