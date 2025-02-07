interface CustomError extends Error {
  statusCode?: number
}

interface UserInfo {
  firstName: string
  lastName: string
  email: string
  age?: number
  bio?: string
}

interface UserStorage extends UserInfo {
  id: number
}

export type { CustomError, UserStorage, UserInfo }
