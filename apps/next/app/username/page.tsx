import Link from 'next/link'
import Form from 'next/form'
import DeleteButton from './DeleteButton'
import api from '@/utils/request2'

const Username = async ({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>
}) => {
  const { search } = await searchParams
  const { result } = await api.queryUsernames(search)

  return (
    <div>
      <Form action="">
        <label htmlFor="username">Username: </label>
        <input
          defaultValue={search}
          id="username"
          name="search"
          placeholder="Username"
        />
      </Form>
      <ul>
        {result?.map(({ id, username }) => (
          <li key={id}>
            {username}
            <DeleteButton id={id} />
          </li>
        ))}
      </ul>
      <Link href="/username/new">New</Link>
    </div>
  )
}

export default Username
