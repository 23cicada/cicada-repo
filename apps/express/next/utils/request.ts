interface RequestOptions extends RequestInit {
  params?: Record<string, string>
}

interface SuccessResponse<T = unknown> {
  success: true
  data: T
  message?: string
}

interface ErrorResponse {
  success: false
  error: {
    code: string
    message: string
    details?: unknown
  }
}

type ResponseResult<T> = SuccessResponse<T> | ErrorResponse

async function fetchRequest<T>(
  url: string,
  options: RequestOptions = {},
): Promise<ResponseResult<T>> {
  const { params, ...restOptions } = options

  let requestUrl = process.env.API_BASE_URL + url
  if (params) {
    const searchParams = new URLSearchParams(params)
    requestUrl += `?${searchParams.toString()}`
  }

  try {
    const response = await fetch(requestUrl, {
      ...restOptions,
      headers: {
        "Content-Type": "application/json",
        ...restOptions.headers,
      },
    })
    return await response.json()
  } catch (error) {
    console.error(error)
    return {
      success: false,
      error: {
        code: "UNEXPECTED_ERROR",
        message: error instanceof Error ? error.message : String(error),
      },
    }
  }
}

const request = {
  get<T>(url: string, options: RequestOptions = {}) {
    return fetchRequest<T>(url, {
      ...options,
      method: "GET",
    })
  },

  post<T>(url: string, data?: unknown, options: RequestOptions = {}) {
    return fetchRequest<T>(url, {
      ...options,
      method: "POST",
      body: JSON.stringify(data),
    })
  },
}

export default request
