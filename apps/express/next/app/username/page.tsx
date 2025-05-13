const Username = async () => {
  const data = await fetch("http://localhost:3001/api/username")
  const posts = await data.json()
  return (
    <div>
      <h1>Username</h1>
    </div>
  )
}

export default Username
