import {
  GET_CHARACTERS_LIST_STARTED,
  GET_CHARACTERS_LIST_SUCCESS,
  GET_CHARACTERS_LIST_FAILED,
} from '../../constants';

import {
  GetCharactersListStarted,
  GetCharactersListSuccess,
  GetCharactersListFailed,
} from '../HomeActtions';

describe('Home actions type test', () => {
  it('dispatch action when action type GET_CHARACTERS_LIST_STARTED', () => {
    const expectedAction = {
      type: GET_CHARACTERS_LIST_STARTED,
    };
    expect(GetCharactersListStarted()).toEqual(expectedAction);
  });
  it('dispatch action when action type GET_CHARACTERS_LIST_SUCCESS', () => {
    const expectedAction = {
      type: GET_CHARACTERS_LIST_SUCCESS,
    };
    expect(GetCharactersListSuccess()).toEqual(expectedAction);
  });
  it('dispatch action when action type GET_CHARACTERS_LIST_FAILED', () => {
    const expectedAction = {
      type: GET_CHARACTERS_LIST_FAILED,
    };
    expect(GetCharactersListFailed()).toEqual(expectedAction);
  });
});
