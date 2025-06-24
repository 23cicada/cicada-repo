import { service } from '../request'

export const authApi = {
  login: async (username: string, password: string) =>
    await service.post<null, string>('/login', { username, password }),

  signUp: async (username: string, password: string) =>
    await service.post<null, string>('/login/sign-up', {
      username,
      password,
    }),

  logout: async () => await service.post<null, string>('/login/logout'),
}
