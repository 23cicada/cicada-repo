import axios, { AxiosRequestConfig } from 'axios'
import type { ServiceResponse, Username } from '@/types'

const request = axios.create({
  baseURL: process.env.API_BASE_URL,
})

request.interceptors.response.use(
  (response) => {
    const { data, headers } = response
    const contentType = headers['Content-Type'] as string
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
  get: <T = unknown, u = unknown, D = unknown>(
    url: string,
    config?: AxiosRequestConfig<D>,
  ) => request.get<unknown, ServiceResponse<T, u>, D>(url, config),
  post: <T = unknown, U = unknown, D = unknown>(
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

  createUsername: async (username: string) =>
    await service.post<null, string[]>('/username/new', { username }),

  login: async (username: string, password: string) =>
    await service.post<null, string[]>('/login', { username, password }),

  signUp: async (username: string, password: string) =>
    await service.post<null, string[]>('/login/sign-up', {
      username,
      password,
    }),
}

export default api
