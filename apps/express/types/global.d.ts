declare global {
  namespace Express {
    interface User {
      id: number
    }
    interface Response {
      success: (data?: unknown, options?: { statusCode?: number }) => void
      error: (error?: unknown, options?: { statusCode?: number }) => void
    }
  }
}

export {}
