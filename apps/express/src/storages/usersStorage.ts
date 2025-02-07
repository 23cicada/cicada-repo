import type { UserStorage, UserInfo } from "../interface.ts"

class UsersStorage {
  public storage: Record<string, UserStorage>
  public id: number
  constructor() {
    this.storage = {}
    this.id = 0
  }

  addUser({ firstName, lastName }: UserInfo) {
    const id = this.id
    this.storage[id] = {
      id,
      firstName,
      lastName,
    }
    this.id++
  }

  getUsers() {
    return Object.values(this.storage)
  }

  getUser(id: string) {
    return this.storage[id]
  }

  updateUser(id: string, { firstName, lastName }: UserInfo) {
    this.storage[id] = {
      id: Number(id),
      firstName,
      lastName,
    }
  }

  deleteUser(id: string) {
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete this.storage[id]
  }
}

export default new UsersStorage()
