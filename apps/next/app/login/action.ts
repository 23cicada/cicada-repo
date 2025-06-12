'use server'

import api from '@/utils/request'
import { redirect } from 'next/navigation'
import { ErrorCode } from '@repo/types'

const signUp = async (prev: unknown, formData: FormData) => {
  // const username = formData.get("username") as string
  // const password = formData.get("password") as string
  // const { success, error } = await api.signUp(username, password)
  // if (success) {
  //   redirect("/login")
  // }
  // return error
}

const login = async (prev: unknown, formData: FormData) => {
  const username = formData.get('username') as string
  const password = formData.get('password') as string
  const { success, error } = await api.login(username, password)
  if (success) {
    redirect('/')
  } else if (error.code === ErrorCode.INVALID_PARAMETERS) {
    return error.details
  }
  return ['unknown error']
}

export { signUp, login }
