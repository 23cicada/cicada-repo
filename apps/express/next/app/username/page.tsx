import Link from "next/link"
import request from "../../utils/request"

const Username = async () => {
  const response =
    await request.get<{ id: string; username: string }[]>("/username")
  const usernames = response.success ? response.data : []
  return (
    <div>
      <h1>Username</h1>
      <ul>
        {usernames?.map(({ id, username }) => <li key={id}>{username}</li>)}
      </ul>
      <Link href="/username/new">New</Link>
    </div>
  )
}

export default Username
