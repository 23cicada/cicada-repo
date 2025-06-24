import { type MessageBoardEntry } from '@/types'
import api from '@/utils/api'
import Link from 'next/link'
import DeleteButton from './DeleteButton'

const MessageBoard: React.FC = async () => {
  const { result = [] } = await api.queryMessageBoard()

  const handleAdd = () => {}

  const handleDelete = (index: number) => {}

  const handleDetail = (message: MessageBoardEntry) => {}

  return (
    <div>
      <h1>Message Board</h1>
      <Link href="/message-board/new">Add Message</Link>
      <ul>
        {result.map((msg, index) => (
          <li key={index}>
            <p>
              <strong>{msg.username}</strong>: {msg.text}
            </p>
            <button>Detail</button> <DeleteButton id={msg.id} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MessageBoard
