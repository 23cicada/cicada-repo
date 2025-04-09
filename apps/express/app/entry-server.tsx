import { StrictMode } from "react"
import { renderToPipeableStream } from "react-dom/server"
import { type EntryServerRender } from "./interface"
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from "react-router"
import routes from "./routes.js"
import { type Request as ExpressRequest } from "express"
import { Transform } from "node:stream"

const routeStaticHandler = createStaticHandler(routes)
const ABORT_DELAY = 10000

const render: EntryServerRender = ({ req, res, template }) => {
  if (req.headers["accept"]?.includes("application/json")) {
    // return handleDataRequest(req);
    console.log("????????????????????????????????")
  } else {
    handleDocumentRequest({ req, res, template })
  }
}

export async function handleDocumentRequest({
  req,
  res,
  template,
}: Parameters<EntryServerRender>[0]) {
  const fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl
  const { query, dataRoutes } = routeStaticHandler
  // 1. Run action/loaders to get the routing context with `query`
  const context = await query(
    new Request(fullUrl, {
      method: req.method,
      headers: convertHeaders(req.headers),
      body: req.method !== "GET" ? req.body : undefined,
    }),
  )

  // If `query` returns a Response, send it raw (a route probably a redirected)
  if (context instanceof Response) {
    return context
  }

  // 2. Create a static router for SSR
  const router = createStaticRouter(dataRoutes, context)
  console.log("router", router)

  // Setup headers from action and loaders from deepest match
  const deepestMatch = context.matches[context.matches.length - 1]
  const actionHeaders = context.actionHeaders[deepestMatch.route.id]
  const loaderHeaders = context.loaderHeaders[deepestMatch.route.id]

  const headers = new Headers(actionHeaders)

  if (loaderHeaders) {
    for (const [key, value] of loaderHeaders.entries()) {
      headers.append(key, value)
    }
  }

  headers.set("Content-Type", "text/html; charset=utf-8")

  let didError = false
  // 3. Render everything with StaticRouterProvider
  const { pipe, abort } = renderToPipeableStream(
    <StrictMode>
      <StaticRouterProvider router={router} context={context} />
    </StrictMode>,
    {
      onShellError() {
        res.status(500)
        res.setHeaders(headers)
        res.send("<h1>Something went wrong</h1>")
      },
      onShellReady() {
        res.status(didError ? 500 : (context.statusCode ?? 200))
        res.setHeaders(headers)
        const transformStream = new Transform({
          transform(chunk, encoding, callback) {
            res.write(chunk, encoding)
            callback()
          },
        })
        const [htmlStart, htmlEnd] = template.split(`<!--app-html-->`)
        res.write(htmlStart)
        transformStream.on("finish", () => {
          res.end(htmlEnd)
        })
        pipe(transformStream)
      },
      onError(error) {
        didError = true
        console.error(error)
      },
    },
  )

  setTimeout(() => {
    abort()
  }, ABORT_DELAY)
}

// export async function handleDataRequest(request: ExpressRequest) {
//   // 1. we don't want to proxy the browser request directly to our router, so we
//   // make a new one.
//   const newRequest =
//     request.method === "POST"
//       ? new Request(request.url, {
//           method: request.method,
//           headers: convertHeaders(request.headers),
//           // @ts-expect-error this is valid, types are wrong
//           body: new URLSearchParams(await request.formData()),
//         })
//       : new Request(request.url, { headers: convertHeaders(request.headers) });

//   // 2. get data from our router, queryRoute knows to call the action or loader
//   // of the leaf route that matches
//   const data = await queryRoute(newRequest);

//   // 3. send the response

//   const headers = new Headers({ "Content-Type": "application/json" });
//   return {
//     headers,
//     data: JSON.stringify(data),
//   };
// }

function convertHeaders(headers: ExpressRequest["headers"]): HeadersInit {
  const result: HeadersInit = {}
  for (const [key, value] of Object.entries(headers)) {
    if (value !== undefined) {
      result[key] = Array.isArray(value) ? value[0] : value
    }
  }
  return result
}

export default render
