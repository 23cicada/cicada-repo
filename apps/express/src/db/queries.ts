import pool from "./pool.ts"

async function getAllusernames(search?: string) {
  if (search) {
    const pattern = `%${search.replace(/([\\%_])/g, "\\$1")}%`
    return (
      await pool.query(
        "select * from usernames where username ilike $1 ESCAPE '\\'",
        [pattern],
      )
    ).rows
  }
  return (await pool.query("select * from usernames")).rows
}

async function insertUsername(username: string) {
  await pool.query("insert into usernames (username) values ($1)", [username])
}

async function deleteUsername(id: string) {
  await pool.query("delete from usernames where id = $1", [id])
}

export { getAllusernames, insertUsername, deleteUsername }
