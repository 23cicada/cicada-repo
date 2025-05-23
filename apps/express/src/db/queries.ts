import pool from "./pool.ts"
import type { MiniMessage } from "../interface.ts"

function escapeLikePattern(str: string): string {
  return str.replace(/([\\%_])/g, "\\$1")
}

async function getAllusernames(search?: string) {
  if (search) {
    const pattern = `%${escapeLikePattern(search)}%`
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

async function getMessages(id?: string) {
  if (id) {
    return (await pool.query("select * from messages where id = $1", [id])).rows
  }
  return (await pool.query("select * from messages")).rows
}

async function getMessage(id: string) {
  return (await pool.query("select * from messages where id = $1", [id]))
    .rows?.[0]
}

async function insertMessage({
  text,
  username,
}: Pick<MiniMessage, "text" | "username">) {
  await pool.query("insert into messages (text, username) values ($1, $2)", [
    text,
    username,
  ])
}

async function deleteMessage(id: string) {
  await pool.query("delete from messages where id = $1", [id])
}

export {
  getAllusernames,
  insertUsername,
  deleteUsername,
  insertMessage,
  getMessages,
  getMessage,
  deleteMessage,
}
