## Next.js App Router Course - Starter

This is the starter template for the Next.js App Router Course. It contains the starting code for the dashboard application.

For more information, see the [course curriculum](https://nextjs.org/learn) on the Next.js Website.

## Server components

1. Static Rendering (at build time)

2. Dynamic Rendering (at request time)

3. Partial Prerendering 在同一路由中结合静态和动态渲染。

  在 React Suspense 中，静态内容会在构建时（或重新验证时）被预渲染并嵌入到初始 HTML 文件中，形成一个静态 shell。而动态内容的渲染则会推迟到用户实际请求该路由时才进行。

  将组件包裹在 Suspense 中并不会使该组件本身变成动态的。Suspense 实际上是作为静态代码和动态代码之间的一个边界来使用的。

  ```javscript
  import type { NextConfig } from 'next';

  const nextConfig: NextConfig = {
    experimental: {
      ppr: 'incremental'
    }
  };

  export default nextConfig;

  Layout:

  export const experimental_ppr = true;

  ```

on the server:

1. Server components => React Server Component Payload (RSC Payload)

2. RSC Payload & Client Component JavaScript => HTML(Shell)

on the client:

1. HTML 用于在初始页面加载时快速显示路由的非交互式预览。

2. React Server Components Payload 用于协调客户端和服务器端组件树，并更新 DOM。

3. Hydrate

The RSC Payload contains:

1. The rendered result of Server Components

2. Placeholders for where Client Components should be rendered and references to their JavaScript files

3. Any props passed from a Server Component to a Client Component

## Streaming - react/nextjs

1. At the page level(route segments) `loading.tsx`

2. At the component level(UI components) `<Suspense>`








### Routing
- `page.tsx`
- `layout.tsx`
- `error.tsx` & `global-error.tsx`
- `loading.tsx` (Streaming)
- `(folderName)` Route Groups
- `[folderName]` Dynamic Routes

`generateStaticParams` 可以与  dynamic route 结合，在构建时静态生成路由，而非在请求时按需生成。

#### Navigating
- `<Link>`
- `useRouter()`
- For Server Components `redirect()`
- `window.history.pushState/replaceState(null, '', url)`

1. Code splitting (by route segments)
2. Prefetching (`router.prefetch()` & `<Link>`)
3. Client-side cache: the React Server Component Payload of prefetched route segments and visited routes are stored in the cache.
4. Partial rendering: only the route segments that change on navigation re-render on the client, and any shared segments are preserved.

#### Redirecting

- `redirect`(303,307), `permanentRedirect`(308):  Server Components, Route Handlers, and Server Actions.
- `useRouter`
- `redirects`(307,308) in `next.config.js`
- `NextResponse.redirect`(any) in Middleware: Middleware runs after redirects in next.config.js and before rendering.

在 Server Action 中使用 `redirect`，将返回 303(See Other)，用于POST请求成功后重定向到成功页面。
#### Server action

使用 `useActionState(fn, initialState, permalink?)` 管理错误并返回给服务端。


