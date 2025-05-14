interface RequestOptions extends RequestInit {
  params?: Record<string, string>
}

interface ResponseData<T = unknown> {
  data: T
  status: number
}

async function fetchRequest<T>(
  url: string,
  options: RequestOptions = {},
): Promise<ResponseData<T>> {
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

    const data = await response.json()

    return {
      data,
      status: response.status,
    }
  } catch (error) {
    throw new Error(
      `Error: ${error instanceof Error ? error.message : String(error)}`,
    )
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
