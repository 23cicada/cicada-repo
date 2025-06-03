import Link from "next/link"
import Form from "next/form"
import request from "../../utils/request"
import DeleteButton from "./DeleteButton"

const Username = async ({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>
}) => {
  const search = (await searchParams).search ?? ""
  const { success, data } = await request.get<
    { id: string; username: string }[]
  >("/username", { params: { search } })
  const usernames = success ? data : []
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
        {usernames?.map(({ id, username }) => (
          <li key={id}>
            {username} <DeleteButton id={id} />
          </li>
        ))}
      </ul>
      <Link href="/username/new">New</Link>
    </div>
  )
}

export default Username
