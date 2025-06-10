import type { AxiosResponse } from 'axios'

interface DataInSuccess<T> {
  success: true
  result: T
}

interface DataInError<T> {
  success: false
  error: {
    code: string
    details: T
  }
}

interface ResponseSuccess<T, D>
  extends AxiosResponse<DataInSuccess<T>, D>,
    DataInSuccess<T> {
  error?: never
}

interface ResponseError<T, D>
  extends AxiosResponse<DataInError<T>, D>,
    DataInError<T> {
  result?: never
}

type ServiceResponse<T, U = unknown, D = unknown> =
  | ResponseSuccess<T, D>
  | ResponseError<U, D>

export type { ServiceResponse }
