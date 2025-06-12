import axios, { AxiosRequestConfig } from 'axios'
import type { ServiceResponse, Username } from '@/types'

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
      console.error('SERVER_ERROR', data)
      return Object.assign({}, error.response, {
        success: data.success,
        error: data.error,
      })
    } else {
      throw new Error('UNEXPECTED_CLIENT_ERROR', { cause: error })
    }
  },
)

const service = {
  get: <T = unknown, D = unknown>(
    url: string,
    config?: AxiosRequestConfig<D>,
  ) => request.get<unknown, ServiceResponse<T, unknown>, D>(url, config),
  post: <U = unknown, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ) => request.post<unknown, ServiceResponse<unknown, U>, D>(url, data, config),
}

const api = {
  queryUsernames: async (search?: string) =>
    await service.get<Username[]>('/username', {
      params: { search },
    }),

  deleteUsername: async (id: string) =>
    await service.post<string[]>('/username/delete', { id }),

  createUsername: async (username: string) =>
    await service.post<string[]>('/username/new', { username }),
}

export default api
