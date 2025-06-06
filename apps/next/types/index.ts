interface ResponseSuccess<T> {
  success: true
  data: T
}
interface ResponseError<T> {
  success: false
  error: T
  data: never
}

type Response<T, U = unknown> = ResponseSuccess<T> | ResponseError<U>

interface Username {
  id: string
  username: string
}

export type { Response, Username }
