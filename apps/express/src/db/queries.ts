import pool from './pool.ts'
import type { MiniMessage } from '../interface.ts'
import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

async function getAllusernames(search?: string) {
  const args: Prisma.usernamesFindManyArgs = search
    ? {
        where: {
          username: {
            contains: search,
            mode: 'insensitive',
          },
        },
      }
    : {}
  return await prisma.usernames.findMany(args)
}

async function insertUsername(username: string) {
  // await pool.query("insert into usernames (username) values ($1)", [username])
  await prisma.usernames.create({
    data: {
      username,
    },
  })
}

async function deleteUsername(id: string) {
  // await pool.query("delete from usernames where id = $1", [id])
  await prisma.usernames.delete({
    where: {
      id: parseInt(id),
    },
  })
}

async function getMessages(id?: string) {
  const args: Prisma.messagesFindManyArgs = id
    ? {
        where: {
          id: parseInt(id),
        },
      }
    : {}
  return await prisma.messages.findMany(args)
}

async function getMessage(id: string) {
  // return (await pool.query("select * from messages where id = $1", [id]))
  //   .rows?.[0]
  return await prisma.messages.findUnique({
    where: {
      id: parseInt(id),
    },
  })
}

async function insertMessage({
  text,
  username,
}: Pick<MiniMessage, 'text' | 'username'>) {
  // await pool.query("insert into messages (text, username) values ($1, $2)", [
  //   text,
  //   username,
  // ])
  await prisma.messages.create({
    data: {
      text,
      username,
    },
  })
}

async function deleteMessage(id: string) {
  // await pool.query("delete from messages where id = $1", [id])
  await prisma.messages.delete({
    where: {
      id: parseInt(id),
    },
  })
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
