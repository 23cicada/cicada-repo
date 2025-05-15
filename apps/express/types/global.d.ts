declare global {
  namespace Express {
    interface Response {
      success: <T = unknown>(data?: T, message?: string, statusCode?: number) => void;
      error: (code: string, message: string, statusCode?: number, details?: unknown) => void;
    }
  }
}

export {}
