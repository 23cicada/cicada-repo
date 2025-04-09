import type { Request, Response } from "express"

type EntryServerRender = (params: {
  req: Request
  res: Response
  template: string
}) => void

export type { EntryServerRender }
