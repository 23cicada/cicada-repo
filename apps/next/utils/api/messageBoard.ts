import { service } from '../request'
import { MessageBoardEntry } from '@/types'

const messageBoardApi = {
  queryMessageBoard: async () =>
    await service.get<MessageBoardEntry[]>('/msg-board'),

  queryMessageBoardDetail: async (id: string) =>
    await service.get<null, string>(`/msg-board/detail/${id}`),

  createMessageBoard: async ({
    text,
    username,
  }: Omit<MessageBoardEntry, 'id'>) =>
    await service.post<null, string>(`/msg-board/new`, {
      text,
      username,
    }),

  deleteMessageBoard: async (id: string) =>
    await service.post<null, string>(`/msg-board/delete/${id}`),
}
export default messageBoardApi
