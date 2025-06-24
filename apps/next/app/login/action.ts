'use server'

import api from '@/utils/api'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { AxiosHeaders } from 'axios'
import cookieParser from 'set-cookie-parser'

const setCookie = async (headers: AxiosHeaders) => {
  const cookieStore = await cookies()
  cookieParser(headers.getSetCookie()).forEach(({ sameSite, ...cookie }) => {
    cookieStore.set({
      ...cookie,
      sameSite: sameSite as 'lax' | 'strict' | 'none',
    })
  })
}

const signUp = async (prev: string | null, formData: FormData) => {
  const username = formData.get('username') as string
  const password = formData.get('password') as string
  const { success, error, headers } = await api.signUp(username, password)
  if (success) {
    await setCookie(headers as AxiosHeaders)
    redirect('/')
  } else {
    return error.message
  }
}

const login = async (
  redirectUrl: string,
  prev: string | null,
  formData: FormData,
) => {
  const username = formData.get('username') as string
  const password = formData.get('password') as string
  const { success, error, headers } = await api.login(username, password)
  if (success) {
    await setCookie(headers as AxiosHeaders)
    redirect(redirectUrl)
  } else {
    return error.message
  }
}
export { signUp, login }
