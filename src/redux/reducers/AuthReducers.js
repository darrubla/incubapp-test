/* eslint-disable default-param-last */
import { USER_LOGGED, USER_LOGOUT } from '../constants'

export const isLoggedInitialState = {
  isLogged: false,
}

export const initialState = {
  ...isLoggedInitialState,
}

export const AuthReducer = (state = initialState, action) => {
  const { type } = action
  switch (type) {
    case USER_LOGGED:
      return {
        ...state,
        isLogged: true,
      }
    case USER_LOGOUT:
      return {
        ...state,
        ...isLoggedInitialState,
      }
    default:
      return state
  }
}

export default AuthReducer
