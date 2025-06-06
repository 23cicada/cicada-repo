declare global {
  namespace Express {
    interface User {
      id: number
    }
    interface Response {
      success: <T = unknown>(data?: T, statusCode?: number) => void
      error: (code: string, errors?: unknown, statusCode?: number) => void
    }
  }
}

declare module "axios" {
  export interface AxiosResponse<T = unknown> {
    success: boolean
  }
}

export {}
