import { ErrorCode } from "@express/errors"

type SuccessResponse<T = unknown> = {
  success: true
  data: T
  code?: never
  errors?: never
}

type InvalidParametersResponse = {
  success: false
  code: ErrorCode.INVALID_PARAMETERS
  errors: string[]
  data?: never
}

type ResponseResult<T = unknown> =
  | SuccessResponse<T>
  | InvalidParametersResponse

interface RequestOptions extends RequestInit {
  params?: Record<string, string>
}

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
    const result = await response.json()
    if (response.ok) {
      return result
    }
    switch (result.code) {
      case ErrorCode.INVALID_PARAMETERS:
        return {
          success: false,
          errors: result.errors,
          code: ErrorCode.INVALID_PARAMETERS,
        }
      default:
        throw new Error(result.code)
    }
  } catch (error) {
    throw new Error((error as Error)?.message ?? "UNEXPECTED_CLIENT_ERROR")
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
export { ErrorCode }
