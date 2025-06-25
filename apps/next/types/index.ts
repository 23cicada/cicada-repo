interface Username {
  id: string
  username: string
}

type MessageBoardEntry = {
  username: string
  text: string
  id: string
  added: string
}

export type { Username, MessageBoardEntry }
export * from './service'
