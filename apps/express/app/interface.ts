import {
  type RenderToPipeableStreamOptions,
  type PipeableStream,
} from "react-dom/server"

type EntryServerRender = (
  url: string,
  options?: RenderToPipeableStreamOptions,
) => PipeableStream

export type { EntryServerRender }
