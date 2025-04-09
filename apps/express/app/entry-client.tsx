import { StrictMode } from "react"
import { hydrateRoot } from "react-dom/client"
import { createBrowserRouter, HydrationState } from "react-router"
import { RouterProvider } from "react-router/dom"
import routes from "./routes.js"

const router = createBrowserRouter(routes, {
  // need to ensure this script runs AFTER <StaticRouterProvider> in
  // entry.server.tsx so that window.__staticRouterHydrationData is available
  hydrationData: window.__staticRouterHydrationData,
})

hydrateRoot(
  document.getElementById("root")!,
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

declare global {
  interface Window {
    __staticRouterHydrationData: HydrationState
  }
}
