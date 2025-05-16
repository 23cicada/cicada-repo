"use server"
import request from "@/utils/request"

const createUsername = async (preState: string | null, formData: FormData) => {
  const username = formData.get("username")
  const { success, errors } = await request.post<void, string[]>(
    "/username/new",
    { username },
  )

  if (!success) {
    console.log(errors)
  }

  return null
}

export { createUsername }
