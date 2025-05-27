import pool from "../pool.ts"

async function insertUser(username: string, password: string) {
  await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [
    username,
    password,
  ])
}

async function getUserByUsername(username: string) {
  const result = await pool.query("SELECT * FROM users WHERE username = $1", [
    username,
  ])
  return result.rows[0]
}

async function getUserById(id: number) {
  const result = await pool.query("SELECT * FROM users WHERE id = $1", [id])
  return result.rows[0]
}

export { insertUser, getUserByUsername, getUserById }
