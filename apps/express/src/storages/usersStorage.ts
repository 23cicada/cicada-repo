import type { UserStorage, UserInfo, UserSearchParams } from "../interface.ts"

class UsersStorage {
  public storage: Record<string, UserStorage>
  public id: number
  constructor() {
    this.storage = {}
    this.id = 0
  }

  addUser({ firstName, lastName, email, age, bio }: UserInfo) {
    const id = this.id
    this.storage[id] = {
      id,
      firstName,
      lastName,
      email,
      age,
      bio,
    }
    this.id++
  }

  getUsers() {
    return Object.values(this.storage)
  }

  getUser(id: string) {
    return this.storage[id]
  }

  updateUser(id: string, { firstName, lastName, email, age, bio }: UserInfo) {
    this.storage[id] = {
      id: Number(id),
      firstName,
      lastName,
      email,
      age,
      bio,
    }
  }

  deleteUser(id: string) {
     
    delete this.storage[id]
  }

  searchUser({ name, email }: UserSearchParams) {
    return Object.values(this.storage).filter((user) => {
      return (
        (!name ||
          user.firstName.toLowerCase().includes(name.toLowerCase()) ||
          user.lastName.toLowerCase().includes(name.toLowerCase())) &&
        (!email || user.email.toLowerCase() === email.toLowerCase())
      )
    })
  }
}

export default new UsersStorage()
