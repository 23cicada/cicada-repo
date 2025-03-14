## Next.js App Router Course - Starter

This is the starter template for the Next.js App Router Course. It contains the starting code for the dashboard application.

For more information, see the [course curriculum](https://nextjs.org/learn) on the Next.js Website.

## Server components

1. Static Rendering (at build time)

2. Dynamic Rendering (at request time)

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