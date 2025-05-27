import pool from "../pool.ts"

async function insertUser(username: string, password: string) {
  await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [
    username,
    password,
  ])
}

export { insertUser }
