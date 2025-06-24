import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import api from '@/utils/api'
import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const manual = searchParams.get('manual')
  if (manual) api.logout()
  const cookieStore = await cookies()
  cookieStore.delete(process.env.COOKIE_NAME!)
  redirect('/login')
}
