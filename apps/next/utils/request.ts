import axios, { AxiosRequestConfig, AxiosError } from 'axios'
import type { ServiceResponse, Username } from '@/types'
import { ErrorCode } from '@repo/types'
import { redirect } from 'next/navigation'

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
})
axiosInstance.interceptors.request.use(async (config) => {
  if (typeof window === 'undefined' && config.withCredentials) {
    const { cookies } = await import('next/headers')
    const cookieStore = await cookies()
    const { name, value } = cookieStore.get('connect.sid') ?? {}
    if (name && value) {
      config.headers.Cookie = `${name}=${value}`
    }
  }
  return config
})
axiosInstance.interceptors.response.use(
  (response) => {
    const { data, headers } = response
    const contentType = headers['content-type'] as string
    if (contentType?.includes('application/json') && 'success' in data) {
      return Object.assign({}, response, {
        result: data.data,
        success: data.success,
      })
    }
    return response
  },
  (error) => {
    if (error.response) {
      const { data } = error.response
      console.error('SERVER_ERROR', data)
      if (data.error?.code === ErrorCode.UNAUTHORIZED) {
        redirect('/api/logout')
      } else {
        return Object.assign({}, error.response, {
          success: data.success,
          error: data.error,
        })
      }
    }

    if (error instanceof AxiosError) {
      throw error
    } else {
      throw new Error(
        error?.code ?? error?.message ?? 'UNEXPECTED_CLIENT_ERROR',
        { cause: error },
      )
    }
  },
)

export const service = {
  get: <T = unknown, u = unknown, D = unknown>(
    url: string,
    config?: AxiosRequestConfig<D>,
  ) => axiosInstance.get<unknown, ServiceResponse<T, u>, D>(url, config),
  post: <T = unknown, U = unknown, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ) => axiosInstance.post<unknown, ServiceResponse<T, U>, D>(url, data, config),
}
