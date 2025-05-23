# `@repo/express`

> 控制器（Controller）的职责实际上就是充当最终的中间人（middleman）。它知道需要向模型（Model）提出哪些问题，但将解决这些问题的繁重工作交给模型来完成。它知道需要渲染哪个视图（View）并将其发送回浏览器，但会让视图负责将所有 HTML 组装起来。这就是为什么称它为“控制器”的原因——它足够智能，知道应该做什么，然后将所有的繁重工作委派出去。

> 中间件（Middleware）是 Express 的核心功能之一，它允许你在请求-响应周期的特定阶段运行代码、修改请求，或结束该周期。因此，在 Express 中，我们使用中间件来实现 MVC 模式中的“控制器”（Controller）部分。

Rewrite relative import extensions with flag
https://github.com/microsoft/TypeScript/pull/59767