"use server"
import request, { ErrorCode } from "@/utils/request"
import { redirect } from "next/navigation"

const createUsername = async (
  preState: string[] | null,
  formData: FormData,
) => {
  const username = formData.get("username")
  const { success, code, errors } = await request.post("/username/new", {
    username,
  })
  if (success) {
    redirect("/username")
  } else if (code === ErrorCode.INVALID_PARAMETERS) {
    return errors
  }
  return null
}

export { createUsername }
