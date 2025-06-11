'use server'

import api from '@/utils/request2'
import { revalidatePath } from 'next/cache'
import { ErrorCode } from '@repo/types'

export async function deleteUsername(id: string) {
  const { success, error } = await api.deleteUsername(id)
  if (success) {
    revalidatePath('/username')
  } else if (error?.code === ErrorCode.INVALID_PARAMETERS) {
    return error.details
  }
}
