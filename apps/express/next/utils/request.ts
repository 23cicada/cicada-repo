interface RequestOptions extends RequestInit {
  params?: Record<string, string>
}

interface SuccessResponse<T> {
  success: true
  data: T
  code?: never
  errors?: never
}

interface ErrorResponse<U> {
  success: false
  code: string
  errors: U
  data?: never
}

type ResponseResult<T, U> = SuccessResponse<T> | ErrorResponse<U>

async function fetchRequest<T, U>(
  url: string,
  options: RequestOptions = {},
): Promise<ResponseResult<T, U>> {
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
      code: "UNEXPECTED_ERROR",
      errors: (error instanceof Error ? error.message : String(error)) as U,
    }
  }
}

const request = {
  get<T, U = unknown>(url: string, options: RequestOptions = {}) {
    return fetchRequest<T, U>(url, {
      ...options,
      method: "GET",
    })
  },

  post<T, U = unknown>(
    url: string,
    data?: unknown,
    options: RequestOptions = {},
  ) {
    return fetchRequest<T, U>(url, {
      ...options,
      method: "POST",
      body: JSON.stringify(data),
    })
  },
}

export default request
