import axios from "axios"

const request = axios.create({
  baseURL: process.env.API_BASE_URL,
})

const api = {
  queryUsernames: async (search: string) =>
    await request.get<{ id: string; username: string }[]>("/username", {
      params: { search },
    }),
}

export default api
