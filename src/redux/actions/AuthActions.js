import { USER_LOGGED, USER_LOGOUT } from '../constants'

export const userLogged = () => ({
  type: USER_LOGGED,
})

export const userLoggedOut = () => ({
  type: USER_LOGOUT,
})
