import { USER_LOGGED, USER_LOGOUT } from '../../constants'

import { userLogged, userLoggedOut } from '../AuthActions'

describe('Auth actions type test', () => {
  it('dispatch action when action type USER_LOGGED', () => {
    const expectedAction = {
      type: USER_LOGGED,
    }
    expect(userLogged()).toEqual(expectedAction)
  })
  it('dispatch action when action type USER_LOGOUT', () => {
    const expectedAction = {
      type: USER_LOGOUT,
    }
    expect(userLoggedOut()).toEqual(expectedAction)
  })
})
