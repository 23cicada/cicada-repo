"use server"
import request from "@/utils/request"

const createUsername = async (preState: string | null, formData: FormData) => {
  console.log("************************")
  // const username = formData.get('username')
  // const { success, error } = await request.post('/username/new', { username })

  // if (!success) {
  //   console.log(error.message)
  // }

  return null
}

export { createUsername }
