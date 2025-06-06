import axios from "axios"
import type { Response, Username } from "@/types"

const request = axios.create({
  baseURL: process.env.API_BASE_URL,
})

request.interceptors.response.use((response) => {
  if (response.headers?.["Content-Type"] === "application/json") {
    return Object.assign({}, response, {
      data: response.data.data,
      success: response.data.success,
    })
  }
  return response
})

const api = {
  queryUsernames: async (search?: string) =>
    await request.get<Response<Username[]>>("/username", {
      params: { search },
    }),
  deleteUsername: async (id: string) =>
    await request.post("/username/delete", {
      id,
    }),
}

export default api
