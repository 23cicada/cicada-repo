import api from '@/utils/api'
import Link from 'next/link'

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ id: string }>
}) => {
  const { id } = await searchParams
  const { result } = await api.queryMessageBoardDetail(id)
  return (
    <div>
      <h1>Detail</h1>
      <p>
        <strong>name: </strong>
        {result?.username}
      </p>
      <p>
        <strong>text: </strong>
        {result?.text}
      </p>
      <p>
        <strong>date: </strong>
        {result?.added}
      </p>
      <Link href="/message-board">Back</Link>
    </div>
  )
}

export default Page
