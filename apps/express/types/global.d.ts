declare global {
  namespace Express {
    interface Response {
      success: <T = unknown>(data?: T, statusCode?: number) => void;
      error: (code: string, errors?: unknown, statusCode?: number) => void;
    }
  }
}

export {}
