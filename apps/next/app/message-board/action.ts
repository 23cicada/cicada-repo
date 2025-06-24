'use server'

import api from '@/utils/api'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

const create = async (prev: string, formData: FormData) => {
  const text = formData.get('text') as string
  const username = formData.get('username') as string
  const { success, error } = await api.createMessageBoard({ text, username })
  if (success) {
    redirect('/message-board')
  } else {
    return error.message
  }
}

const remove = async (id: string) => {
  const { success, error } = await api.deleteMessageBoard(id)
  if (success) {
    revalidatePath('/message-board')
  } else {
    return error.message
  }
}

export { create, remove }
