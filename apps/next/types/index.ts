interface ResponseSuccess<T> {
  success: true
  data: T
  error: never
}
interface ResponseError<T> {
  success: false
  error: {
    code: string
    details: T
    stack: unknown
  }
  data: never
}

type Response<T, U = unknown> = ResponseSuccess<T> | ResponseError<U>

interface Username {
  id: string
  username: string
}

export type { Response, Username }
