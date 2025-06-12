'use server'

import api from '@/utils/request'
import { revalidatePath } from 'next/cache'
import { ErrorCode } from '@repo/types'
import { redirect } from 'next/navigation'

export async function deleteUsername(id: string) {
  const { success, error } = await api.deleteUsername(id)
  if (success) {
    revalidatePath('/username')
  } else if (error?.code === ErrorCode.INVALID_PARAMETERS) {
    return error.details
  }
}

export const createUsername = async (
  preState: string[] | null,
  formData: FormData,
) => {
  const username = formData.get('username') as string
  const { success, error } = await api.createUsername(username)
  if (success) {
    redirect('/username')
  } else if (error?.code === ErrorCode.INVALID_PARAMETERS) {
    return error.details
  }
  return null
}
