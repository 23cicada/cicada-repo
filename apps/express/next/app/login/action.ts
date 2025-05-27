"use server"

import request from "@/utils/request"
import { redirect } from "next/navigation"

const signUp = async (prev: string[], formData: FormData) => {
  const { success, errors } = await request.post("/login/sign-up", {
    username: formData.get("username"),
    password: formData.get("password"),
  })
  if (success) {
    redirect("/login")
  }
  return errors
}

const login = async (prev: string[], formData: FormData) => {
  const { success, errors } = await request.post("/login", {
    username: formData.get("username"),
    password: formData.get("password"),
  })
  return []
}

export { signUp, login }
