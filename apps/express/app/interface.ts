import {
  type RenderToPipeableStreamOptions,
  type PipeableStream,
} from "react-dom/server"
import type { Request } from "express"

type EntryServerRender = (
  req: Request,
  options?: RenderToPipeableStreamOptions,
) => PipeableStream

export type { EntryServerRender }
