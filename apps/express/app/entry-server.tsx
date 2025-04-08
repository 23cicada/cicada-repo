import { StrictMode } from "react"
import { renderToPipeableStream } from "react-dom/server"
import { type EntryServerRender } from "./interface.ts"
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from "react-router"
import routes from "./routes.js"
import { type Request } from "express"

// const { query, dataRoutes, queryRoute } = createStaticHandler(routes);

const render: EntryServerRender = (request, options) => {
  // if (request.headers.accept?.includes("application/json")) {
  //   return handleDataRequest(request);
  // } else {
  //   return handleDocumentRequest(request);
  // }
  return renderToPipeableStream(<StrictMode></StrictMode>, options)
}

// export async function handleDocumentRequest(request: Request) {
//   // 1. Run action/loaders to get the routing context with `query`
//   let context = await query(request);

//   // If `query` returns a Response, send it raw (a route probably a redirected)
//   if (context instanceof Response) {
//     return context;
//   }

//   // 2. Create a static router for SSR
//   let router = createStaticRouter(dataRoutes, context);

//   // 3. Render everything with StaticRouterProvider
//   let html = renderToString(
//     <StrictMode>
//       <StaticRouterProvider router={router} context={context} />
//     </StrictMode>,
//   );

//   // Setup headers from action and loaders from deepest match
//   let deepestMatch = context.matches[context.matches.length - 1];
//   let actionHeaders = context.actionHeaders[deepestMatch.route.id];
//   let loaderHeaders = context.loaderHeaders[deepestMatch.route.id];

//   let headers = new Headers(actionHeaders);

//   if (loaderHeaders) {
//     for (let [key, value] of loaderHeaders.entries()) {
//       headers.append(key, value);
//     }
//   }

//   headers.set("Content-Type", "text/html; charset=utf-8");
//   return new Response(`<!DOCTYPE html>${html}`, {
//     status: context.statusCode,
//     // 4. send proper headers
//     headers,
//   });
// }

// export async function handleDataRequest(request: Request) {
//   // 1. we don't want to proxy the browser request directly to our router, so we
//   // make a new one.
//   const newRequest =
//     request.method === "POST"
//       ? new Request(request.url, {
//           method: request.method,
//           // headers: request.headers,
//           // @ts-expect-error this is valid, types are wrong
//           body: new URLSearchParams(await request.formData()),
//         })
//       : new Request(request.url, {
//         // headers: request.headers
//        });
//
//   // 2. get data from our router, queryRoute knows to call the action or loader
//   // of the leaf route that matches
//   const data = await queryRoute(newRequest);
//
//   // 3. send the response
//   return new Response(JSON.stringify(data), {
//     headers: { "Content-Type": "application/json" },
//   });
// }

export default render
