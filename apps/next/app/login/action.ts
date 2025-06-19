'use server'

import api from '@/utils/request'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { AxiosHeaders } from 'axios'
import cookieParser from 'set-cookie-parser'

const signUp = async (prev: unknown, formData: FormData) => {
  // const username = formData.get("username") as string
  // const password = formData.get("password") as string
  // const { success, error } = await api.signUp(username, password)
  // if (success) {
  //   redirect("/login")
  // }
  // return error
}

const login = async (redirectUrl: string, prev: string, formData: FormData) => {
  const username = formData.get('username') as string
  const password = formData.get('password') as string
  const { success, error, headers } = await api.login(username, password)
  if (success) {
    const cookieStore = await cookies()
    const cookieList = cookieParser.parse(
      (headers as AxiosHeaders).getSetCookie(),
    )
    for (const cookie of cookieList) {
      cookieStore.set({
        ...cookie,
        sameSite: cookie.sameSite as 'lax' | 'strict' | 'none' | undefined,
      })
    }
    redirect(redirectUrl)
  } else {
    return error.message
  }
}

export { signUp, login }
