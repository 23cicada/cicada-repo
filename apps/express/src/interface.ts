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

interface UserSearchParams {
  name?: string
  email?: string
}

interface UserStorage extends UserInfo {
  id: number
}

interface MiniMessage {
  text: string
  username: string
  added: Date
}

export type {
  CustomError,
  UserStorage,
  UserInfo,
  UserSearchParams,
  MiniMessage,
}
