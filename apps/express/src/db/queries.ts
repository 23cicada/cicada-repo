import pool from "./pool.ts"

async function getAllusernames() {
  const { rows } = await pool.query("select * from usernames")
  return rows
}

async function insertUsername(username: string) {
  await pool.query("insert into usernames (username) values ($1)", [username])
}

export { getAllusernames, insertUsername }
