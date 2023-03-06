import {
  GET_CHARACTERS_LIST_STARTED,
  GET_CHARACTERS_LIST_SUCCESS,
  GET_CHARACTERS_LIST_FAILED,
} from '../../constants';

import { initialState, HomeReducer } from '../HomeReducers';

describe('Home Reducers tests', () => {
  it('Should return newState when action type GET_CHARACTERS_LIST_STARTED', () => {
    const action = {
      type: GET_CHARACTERS_LIST_STARTED,
      payload: {},
    };
    const expectedResult = {
      ...initialState,
      charactersListIsLoading: true,
    };
    expect(HomeReducer({}, action)).toEqual(expectedResult);
  });
  it('Should return newState when action type GET_CHARACTERS_LIST_SUCCESS', () => {
    const action = {
      type: GET_CHARACTERS_LIST_SUCCESS,
      payload: {},
    };
    const expectedResult = {
      ...initialState,
      charactersList: action.payload,
      charactersListSuccess: true,
      charactersListIsLoading: false,
    };
    expect(HomeReducer({}, action)).toEqual(expectedResult);
  });
  it('Should return newState when action type GET_CHARACTERS_LIST_FAILED', () => {
    const action = {
      type: GET_CHARACTERS_LIST_FAILED,
      payload: {},
    };
    const expectedResult = {
      ...initialState,
      charactersListFailed: true,
      charactersListIsLoading: false,
      charactersListError: action.payload,
    };
    expect(HomeReducer({}, action)).toEqual(expectedResult);
  });
});
