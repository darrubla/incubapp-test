import { USER_LOGGED, USER_LOGOUT } from '../../constants'

import { initialState, AuthReducer } from '../AuthReducers'

describe('Auth Reducers tests', () => {
  it('Should return newState when action type USER_LOGGED', () => {
    const action = {
      type: USER_LOGGED,
    }
    const expectedResult = {
      ...initialState,
      isLogged: true,
    }
    expect(AuthReducer({}, action)).toEqual(expectedResult)
  })
  it('Should return newState when action type USER_LOGOUT', () => {
    const action = {
      type: USER_LOGOUT,
      payload: {},
    }
    const expectedResult = {
      ...initialState,
    }
    expect(AuthReducer({}, action)).toEqual(expectedResult)
  })
})
