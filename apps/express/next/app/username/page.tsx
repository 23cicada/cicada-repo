import request from "../../utils/request"

const Username = async () => {
  const data = await request.get("/username")
  console.log(data)
  return (
    <div>
      <h1>Username</h1>
    </div>
  )
}

export default Username
