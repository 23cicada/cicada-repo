'use server'

import api from '@/utils/request'
import { redirect } from 'next/navigation'
import { ErrorCode } from '@repo/types'
import { cookies } from 'next/headers'

const assertString = (formData: FormData, key: string) =>
  formData.get(key) as string

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
  const username = assertString(formData, 'username')
  const password = assertString(formData, 'password')
  const { success, error } = await api.login(username, password)
  if (success) {
    redirect('/')
  } else {
    return error.message
  }
}

export { signUp, login }
