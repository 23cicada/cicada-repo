import axios, { AxiosRequestConfig } from 'axios'
import type { ServiceResponse, Username } from '@/types'
import { ErrorCode } from '@repo/types'

const request = axios.create({
  baseURL: process.env.API_BASE_URL,
})

request.interceptors.response.use(
  (response) => {
    const { data } = response
    if ('success' in data) {
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
      console.error('server error', data.error)
      return Object.assign({}, error.response, {
        success: data.success,
        error: data.error,
      })
    } else {
      throw new Error('Uncaught error')
    }
  },
)

const service = {
  get: <T, U = unknown, D = unknown>(
    url: string,
    config?: AxiosRequestConfig<D>,
  ) => request.get<unknown, ServiceResponse<T, U>, D>(url, config),
  post: <T, U = unknown, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ) => request.post<unknown, ServiceResponse<T, U>, D>(url, data, config),
}

const api = {
  queryUsernames: async (search?: string) =>
    await service.get<Username[]>('/username', {
      params: { search },
    }),

  deleteUsername: async (id: string) =>
    await service.post<null, string[]>('/username/delete', { id }),
}

export default api
