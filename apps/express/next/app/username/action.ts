"use server"

import request, { ErrorCode } from "@/utils/request"
import { revalidatePath } from "next/cache"

export async function deleteUsername(id: string) {
  const { success, code, errors } = await request.post("/username/delete", {
    id,
  })
  if (success) {
    revalidatePath("/username")
  } else if (code === ErrorCode.INVALID_PARAMETERS) {
    return errors
  }
}
