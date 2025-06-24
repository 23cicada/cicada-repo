import { service } from '../request'
import type { Username } from '@/types'

export const usernameApi = {
  queryUsernames: async (search?: string) =>
    await service.get<Username[]>('/username', {
      params: { search },
    }),

  deleteUsername: async (id: string) =>
    await service.post<null, string[]>('/username/delete', { id }),

  createUsername: async (username: string) =>
    await service.post<null, string[]>('/username/new', { username }),
}
