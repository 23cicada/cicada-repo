import axios from "axios"

const request = axios.create({
  baseURL: "http://localhost:3000",
})

const test = async () => {
  const { data } = await request.get<{ name: "string"; age: 80 }>("/api/test")
}
