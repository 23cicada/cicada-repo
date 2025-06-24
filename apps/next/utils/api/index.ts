import { authApi } from './auth'
import { usernameApi } from './username'
import messageBoard from './messageBoard'

const api = Object.assign({}, authApi, usernameApi, messageBoard)

export default api
