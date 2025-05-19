"use server"
import request, { ErrorCode } from "@/utils/request"

const createUsername = async (
  preState: string[] | null,
  formData: FormData,
) => {
  const username = formData.get("username")
  const { code, errors } = await request.post("/username/new", { username })
  if (code === ErrorCode.INVALID_PARAMETERS) {
    return errors
  }
  return null
}

export { createUsername }
