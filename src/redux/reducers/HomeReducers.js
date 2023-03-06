/* eslint-disable default-param-last */
import {
  GET_CHARACTERS_LIST_STARTED,
  GET_CHARACTERS_LIST_SUCCESS,
  GET_CHARACTERS_LIST_FAILED,
} from '../constants';

const initialStateGetCharactersList = {
  charactersList: [],
  charactersListSuccess: false,
  charactersListFailed: false,
  charactersListIsLoading: false,
  charactersListError: '',
};

export const initialState = {
  ...initialStateGetCharactersList,
};

export const HomeReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_CHARACTERS_LIST_STARTED: {
      return {
        ...state,
        ...initialStateGetCharactersList,
        charactersListIsLoading: true,
      };
    }
    case GET_CHARACTERS_LIST_SUCCESS: {
      return {
        ...state,
        ...initialStateGetCharactersList,
        charactersList: payload,
        charactersListSuccess: true,
        charactersListIsLoading: false,
      };
    }
    case GET_CHARACTERS_LIST_FAILED: {
      return {
        ...state,
        ...initialStateGetCharactersList,
        charactersListFailed: true,
        charactersListIsLoading: false,
        charactersListError: payload,
      };
    }
    default:
      return state;
  }
};

export default HomeReducer;
